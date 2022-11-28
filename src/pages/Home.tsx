import React, { useContext, useEffect, useState } from "react";
import {
  Grid,
  Card,
  CardHeader,
  CardContent,
  Alert,
  Divider,
  Button,
  Link,
} from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import {
  DataGrid,
  GridColDef,
  GridComparatorFn,
  GridEventListener,
} from "@mui/x-data-grid";
import moment from "moment";
import { Add } from "@mui/icons-material";
import EditIcon from "@mui/icons-material/Edit";
import { IEdital, IEtapa } from "../interfaces/Interfaces";
import { getAllProcessosSeletivos } from "../services/Api";
import Loading from "../components/Loading";
import UserContext from "../context/UserContext";
import PDFFile from "../components/PDFFile";
import auth from "../services/Auth";
import Inscrito from "../components/Inscrito";
import editalService from "../services/Edital";
import { EtapasEnum } from "../enums/Enums";

export default function Home() {
  const navigate = useNavigate();
  const location = useLocation();
  const signUpSuccess = location.state ? "signUp" in location.state : false;
  const signOutSuccess = location.state ? "signOut" in location.state : false;
  const signInSuccess = location.state ? "signIn" in location.state : false;
  const editSuccess = location.state ? "edit" in location.state : false;
  const editInscricaoSuccess = location.state
    ? "editInscricao" in location.state
    : false;
  const novoEditalSuccess = location.state
    ? "novoEdital" in location.state
    : false;
  window.history.replaceState(null, "");
  const { user } = useContext(UserContext);
  const [editais, setEditais] = useState<IEdital[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [isAluno, setIsAluno] = useState<boolean>(false);
  const [isRoot, setIsRoot] = useState<boolean>(false);

  const redirectToNovoEdital = () => {
    navigate("/edital/novo");
  };

  const editaisComEtapaAtual = (
    rawEditais: IEdital[],
    etapas: IEtapa[]
  ): IEdital[] => {
    return rawEditais.map((edital) => {
      const etapaAtual = etapas.find(
        (etapa) => edital.id === etapa.processo_seletivo_id
      );
      return { ...edital, etapa_atual: etapaAtual };
    });
  };

  useEffect(() => {
    setIsAluno(auth.isStudent());
    setIsRoot(auth.isRoot());
  }, [user]);

  useEffect(() => {
    setLoading(true);
    getAllProcessosSeletivos()
      .then(({ data }) => {
        setEditais(
          editaisComEtapaAtual(
            data.editais.processos,
            data.etapas_atuais.etapas
          )
        );
      })
      .catch()
      .finally(() => {
        setLoading(false);
      });
  }, [user]);

  const checkSuccessMessage = (): string | null => {
    if (signInSuccess) {
      return "Login efetuado com sucesso.";
    }

    if (signOutSuccess) {
      return "Você foi deslogado com sucesso.";
    }

    if (editInscricaoSuccess) {
      return "Sua inscrição foi alterada com sucesso.";
    }

    if (editSuccess) {
      return "Dados pessoais alterados com sucesso.";
    }
    if (novoEditalSuccess) {
      return "Processo Seletivo criado com sucesso.";
    }

    if (signUpSuccess) {
      return "Cadastro de professor realizado com sucesso.";
    }

    return null;
  };

  const handleRowClick: GridEventListener<"rowClick"> = (params) => {
    navigate(`/edital/${params.row.id}/detalhes`);
  };

  const handleLinkClick = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
  };

  const redirectToCadastroTeacher = () => {
    navigate("/cadastro-professor");
  };

  const dateToStr = (rawDate: string) => {
    const date = moment(rawDate);
    return date.format("DD/MM/YYYY");
  };

  const etapaComparator: GridComparatorFn<IEtapa> = (v1, v2) => {
    const etapa1 = editalService.etapaAtual(v1);
    const etapa2 = editalService.etapaAtual(v2);
    return etapa1 - etapa2;
  };

  const colunas: GridColDef[] = [
    {
      field: "titulo",
      headerName: "Edital",
      width: 240,
      renderCell: (cellValues) => {
        return (
          <PDFFile
            pdfUrl={cellValues.row.edital_url}
            pdfTitle={cellValues.row.titulo}
            onClick={handleLinkClick}
          />
        );
      },
    },
    {
      field: "inscrito",
      headerName: "Inscrito(a)",
      width: 170,
      hide: !isAluno,
      valueGetter: (params) => params.row.isInscrito,
      renderCell: (cellValues) => {
        return <Inscrito isInscrito={cellValues.row.isInscrito} />;
      },
    },
    {
      field: "semestre",
      headerName: "Semestre",
      width: 145,
    },
    {
      field: "etapa_atual",
      headerName: "Etapa Atual",
      width: 290,
      sortComparator: etapaComparator,
      renderCell: (cellValues) => {
        const etapaAtual = cellValues.row.etapa_atual;

        const nomeDaEtapa = editalService.nomeDaEtapaRaw(etapaAtual);

        const etapasComData = [
          EtapasEnum.INSCRICOES_ABERTAS,
          EtapasEnum.ANALISE_DE_INSCRICOES,
        ];

        const isEtapaComData = editalService.isEtapaValida(
          etapaAtual,
          etapasComData
        );

        const dataFim = dateToStr(etapaAtual.data_fim);

        return nomeDaEtapa + (isEtapaComData ? ` (até ${dataFim})` : "");
      },
    },
    {
      field: "edit",
      headerName: "Editar",
      width: 60,
      hide: !isRoot,
      renderCell: (cellValues) => {
        return (
          <Link
            href={`/edital/${cellValues.row.id}/editar`}
            underline="none"
            onClick={handleLinkClick}
          >
            <EditIcon />
          </Link>
        );
      },
    },
  ];

  const allColumnsWidth = colunas.reduce((acc, { width, hide }) => {
    return width && !hide ? acc + width : acc;
  }, 0);

  const successMessage = checkSuccessMessage();

  return loading ? (
    <Loading />
  ) : (
    <Grid
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
      sx={{ height: "100%" }}
    >
      {successMessage && (
        <Alert severity="success" sx={{ mb: 2 }}>
          {successMessage}
        </Alert>
      )}

      {isRoot && (
        <Grid>
          <Button
            type="button"
            onClick={redirectToNovoEdital}
            size="large"
            sx={{ mx: 1 }}
          >
            <Add fontSize="small" sx={{ mr: 1 }} /> Novo Processo Seletivo
          </Button>

          <Button
            type="button"
            size="large"
            onClick={redirectToCadastroTeacher}
            sx={{ mx: 1 }}
          >
            <Add fontSize="small" sx={{ mr: 1 }} /> Cadastrar Professor
          </Button>
        </Grid>
      )}

      <Card sx={{ py: 2, mt: 5 }}>
        <CardHeader
          title="Processos Seletivos"
          titleTypographyProps={{
            align: "center",
            variant: "h4",
          }}
          sx={{ px: 3 }}
          subheader="Concessão de Bolsas de Mestrado e Doutorado"
          subheaderTypographyProps={{
            align: "center",
          }}
        />

        <Divider sx={{ mx: 3, my: 2 }} />

        <CardContent sx={{ px: 10 }}>
          <DataGrid
            initialState={{
              sorting: {
                sortModel: [{ field: "etapa_atual", sort: "asc" }],
              },
            }}
            onRowClick={handleRowClick}
            rows={editais}
            columns={colunas}
            sx={{
              width: Math.min(allColumnsWidth + 2, 1000),
            }}
          />
        </CardContent>
      </Card>
    </Grid>
  );
}
