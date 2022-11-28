import { Card, CardContent, CardHeader, Divider, Grid } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useContext, useEffect, useState } from "react";
import Loading from "../components/Loading";
import UserContext from "../context/UserContext";
import { IProfessores } from "../interfaces/Interfaces";
import { getAllProfessores } from "../services/Api";

export default function ListaUsuarios() {
  const { user } = useContext(UserContext);
  const [listaProfessores, setListaProfessores] = useState<IProfessores[]>([]);
  const [loadingProfessores, setLoadingProfessoes] = useState<boolean>(false);

  useEffect(() => {
    setLoadingProfessoes(true);
    if (user) {
      getAllProfessores()
        .then(({ data }) => setListaProfessores(data))
        .catch()
        .finally(() => {
          setLoadingProfessoes(false);
        });
    }
  }, [user]);

  const colunas: GridColDef[] = [
    {
      field: "id",
      headerName: "ID",
      width: 100,
    },
    {
      field: "nome",
      headerName: "Nome",
      width: 300,
    },
    {
      field: "siape",
      headerName: "Siape",
      width: 100,
    },
  ];

  const allColumnsWidth = colunas.reduce((acc, { width }) => {
    return width ? acc + width : acc;
  }, 0);

  return loadingProfessores ? (
    <Loading />
  ) : (
    <Grid
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
      sx={{ width: "100%" }}
    >
      <Card>
        <CardHeader
          title="Professores Cadastrados"
          titleTypographyProps={{
            align: "center",
            variant: "h4",
          }}
          subheader="Lista de professores cadastrados no sistema"
          subheaderTypographyProps={{
            align: "center",
          }}
        />

        <Divider sx={{ mx: 3, my: 2 }} />

        <CardContent sx={{ px: 10 }}>
          <DataGrid
            initialState={{
              sorting: {
                sortModel: [{ field: "nome", sort: "asc" }],
              },
            }}
            disableSelectionOnClick
            rows={listaProfessores}
            columns={colunas}
            sx={{
              width: Math.min(allColumnsWidth + 2, 1000),
              mb: 5,
            }}
          />
        </CardContent>
      </Card>
    </Grid>
  );
}
