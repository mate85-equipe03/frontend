import React, { useContext, useEffect, useState } from "react";
import {
  Grid,
  Card,
  CardHeader,
  CardContent,
  Alert,
  Divider,
  Button,
} from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import { DataGrid, GridColDef, GridEventListener } from "@mui/x-data-grid";
import moment from "moment";
import { Add } from "@mui/icons-material";
import { IEdital } from "../interfaces/Interfaces";
import { getAllProcessosSeletivos } from "../services/Api";
import Loading from "../components/Loading";
import UserContext from "../context/UserContext";
import PDFFile from "../components/PDFFile";
import auth from "../services/Auth";
import Inscrito from "../components/Inscrito";
import editalService from "../services/Edital";

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

  const redirectToNovoEdital = () => {
    navigate("/edital/novo");
  };

  useEffect(() => {
    setIsAluno(auth.isStudent());
  }, [user]);

  useEffect(() => {
    setLoading(true);
    getAllProcessosSeletivos()
      .then(({ data }) => setEditais(data.editais.processos))
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
      return "Novo Processo Seletivo criado com sucesso.";
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
      field: "arquivado",
      headerName: "Status",
      width: 145,
      valueGetter: (params) => {
        return params.row.arquivado ? "Encerrado" : "Em Andamento";
      },
    },
    {
      field: "etapa",
      headerName: "Etapa Atual",
      width: 270,
      valueGetter: (params) => {
        const { etapas } = params.row;
        // TODO: Pegar etapa_atual quando o back mandar
        if (etapas.length > 0) {
          const etapaAtual = editalService.etapaAtual(etapas[0], params.row);
          const nomeDaEtapa = editalService.nomeDaEtapa(etapaAtual);
          const dataFim = dateToStr(etapas[0].data_fim);
          if (nomeDaEtapa) {
            return `${nomeDaEtapa} (até ${dataFim})`;
          }
        }
        return "";
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

      {auth.isRoot() && (
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
            {/* @Kennedy POSG-120  */}
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
                sortModel: [{ field: "arquivado", sort: "asc" }],
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
