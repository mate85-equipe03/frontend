import React, { useContext, useEffect, useState } from "react";
import {
  Grid,
  Card,
  CardHeader,
  CardContent,
  Alert,
  Link,
  Divider,
} from "@mui/material";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import { useNavigate, useLocation } from "react-router-dom";
import { DataGrid, GridColDef, GridEventListener } from "@mui/x-data-grid";
import moment from "moment";
import { IEdital } from "./Types";
import getAllProcessosSeletivos from "./Service";
import Loading from "../../Components/Loading";
import UserContext from "../../context/UserContext";

export default function Home() {
  const navigate = useNavigate();
  const location = useLocation();
  const signOutSuccess = location.state ? "signOut" in location.state : false;
  const signInSuccess = location.state ? "signIn" in location.state : false;
  const editInscricaoSuccess = location.state
    ? "editInscricao" in location.state
    : false;
  window.history.replaceState(null, "");
  const { user } = useContext(UserContext);
  const [editais, setEditais] = useState<IEdital[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [isAluno, setIsAluno] = useState<boolean>(false);

  useEffect(() => {
    if (user?.role === "ALUNO") {
      setIsAluno(true);
    } else {
      setIsAluno(false);
    }
  }, [user]);

  useEffect(() => {
    setLoading(true);
    getAllProcessosSeletivos()
      .then(({ data }) => setEditais(data.editais.processos))
      .catch(() => {
        // TODO: Ver como exibir erros va View
      })
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

    return null;
  };

  const handleRowClick: GridEventListener<"rowClick"> = (params) => {
    navigate(`/edital/${params.row.id}/detalhes`);
  };

  const handleLinkClick = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
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
          <Link
            href={cellValues.row.edital_url}
            target="_blank"
            underline="none"
            onClick={handleLinkClick}
          >
            <PictureAsPdfIcon fontSize="small" sx={{ mr: 0.5 }} />
            {cellValues.row.titulo}
          </Link>
        );
      },
    },
    {
      field: "inscrito",
      headerName: "Inscrito(a)",
      width: 170,
      hide: !isAluno,
      renderCell: (cellValues) => {
        return cellValues.row.isInscrito ? (
          <Grid sx={{ color: "success.main", fontWeight: "bold" }}>
            <CheckCircleIcon fontSize="small" sx={{ mr: 0.5 }} />
            Inscrito(a)
          </Grid>
        ) : (
          <Grid sx={{ color: "error.main", fontWeight: "bold" }}>
            <CancelIcon fontSize="small" sx={{ mr: 0.5 }} />
            Não Inscrito(a)
          </Grid>
        );
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
        return etapas.length > 0
          ? `${etapas[0].name} (até ${dateToStr(etapas[0].data_fim)})`
          : "Resultados disponíveis";
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
