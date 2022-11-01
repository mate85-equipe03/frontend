/* eslint-disable react/jsx-props-no-spreading */

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
import {
  DataGrid,
  GridColDef,
  GridEventListener,
  ptBR,
} from "@mui/x-data-grid";
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
      width: 200,
    },
    {
      field: "inscrito",
      headerName: "Inscrito?",
      width: 100,
      renderCell: (cellValues) => {
        return cellValues.row.isInscrito ? (
          <CheckCircleIcon color="success" fontSize="small" />
        ) : (
          <CancelIcon color="error" fontSize="small" />
        );
      },
    },
    {
      field: "edital_url",
      headerName: "Edital",
      width: 260,
      renderCell: (cellValues) => {
        return (
          <Link
            href={cellValues.row.edital_url}
            target="_blank"
            underline="none"
            onClick={handleLinkClick}
          >
            <PictureAsPdfIcon fontSize="small" sx={{ mr: 0.5 }} />
            {`${cellValues.row.titulo}.pdf`}
          </Link>
        );
      },
    },
    {
      field: "arquivado",
      headerName: "Status",
      width: 120,
      valueGetter: (params) => {
        return params.row.arquivado ? "Encerrado" : "Em Andamento";
      },
    },
    {
      field: "etapa",
      headerName: "Etapa Atual",
      width: 200,
      valueGetter: (params) => {
        const { etapas } = params.row;
        return etapas.length > 0
          ? `${etapas[0].name} (até ${dateToStr(etapas[0].data_fim)})`
          : "Resultados disponíveis";
      },
    },
  ];

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
      {signOutSuccess && (
        <Alert severity="success" sx={{ mb: 2 }}>
          Você está deslogado.
        </Alert>
      )}
      {signInSuccess && (
        <Alert severity="success" sx={{ mb: 2 }}>
          Você está logado.
        </Alert>
      )}
      <Card sx={{ py: 2 }}>
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
        <Divider sx={{ mx: 3 }} />
        <CardContent
          sx={{
            px: { xs: 5, sm: 5 },
            width: "90vw",
            minHeight: 260,
            height: "45vh",
          }}
        >
          <DataGrid
            onRowClick={handleRowClick}
            {...editais}
            rows={editais}
            columns={colunas}
            pageSize={5}
            rowsPerPageOptions={[5, 10, 15, 20]}
            localeText={ptBR.components.MuiDataGrid.defaultProps.localeText}
            initialState={{
              columns: {
                columnVisibilityModel: {
                  inscrito: isAluno,
                },
              },
            }}
          />
        </CardContent>
      </Card>
    </Grid>
  );
}
