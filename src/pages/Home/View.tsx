/* eslint-disable react/jsx-props-no-spreading */

import React, { useContext, useEffect, useState } from "react";
import {
  Grid,
  Card,
  CardHeader,
  CardContent,
  Alert,
  Link,
  Typography,
} from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import {
  DataGrid,
  GridColDef,
  GridEventListener,
  ptBR,
} from "@mui/x-data-grid";
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

  const colunas: GridColDef[] = [
    {
      field: "titulo",
      headerName: "Edital",
      width: 300,
    },
    {
      field: "edital_url",
      headerName: "Link do Edital",
      width: 200,
      renderCell: (cellValues) => {
        return (
          <Link href={`#${cellValues.row.url}`}>
            {cellValues.row.edital_url}
          </Link>
        );
      },
    },
    {
      field: "arquivado",
      headerName: "Status",
      width: 200,
      renderCell: (cellValues) => {
        return cellValues.value === true ? (
          <Typography>Fechado</Typography>
        ) : (
          <Typography>Aberto</Typography>
        );
      },
    },
    {
      field: "etapa",
      headerName: "Etapa Atual",
      width: 200,
      valueGetter: (params) => {
        return params.row.etapas.name;
      },
    },
    {
      field: "inscrito",
      headerName: "Inscrito",
      width: 200,
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
      <Card>
        <CardHeader
          title="Processos Seletivos"
          titleTypographyProps={{
            align: "center",
            variant: "h4",
            p: 1,
          }}
        />
        <CardContent sx={{ px: { xs: 5, sm: 10 } }}>
          <div style={{ height: 400, width: 800 }}>
            <DataGrid
              onRowClick={handleRowClick}
              {...editais}
              rows={editais}
              columns={colunas}
              pageSize={5}
              rowsPerPageOptions={[]}
              localeText={ptBR.components.MuiDataGrid.defaultProps.localeText}
              initialState={{
                columns: {
                  columnVisibilityModel: {
                    inscrito: isAluno,
                  },
                },
              }}
            />
          </div>
        </CardContent>
      </Card>
    </Grid>
  );
}
