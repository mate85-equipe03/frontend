import { Add } from "@mui/icons-material";
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
} from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Loading from "../components/Loading";
import UserContext from "../context/UserContext";
import { IProfessores } from "../interfaces/Interfaces";
import { getAllProfessores } from "../services/Api";

export default function ListaUsuarios() {
  const { user } = useContext(UserContext);
  const [listaProfessores, setListaProfessores] = useState<IProfessores[]>([]);
  const [loadingProfessores, setLoadingProfessoes] = useState<boolean>(false);

  const navigate = useNavigate();

  const redirectToCadastroTeacher = () => {
    navigate("/cadastro-professor");
  };

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
      field: "siape",
      headerName: "Siape",
      width: 100,
    },
    {
      field: "nome",
      headerName: "Nome",
      width: 400,
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
      <Button
        type="button"
        size="large"
        onClick={redirectToCadastroTeacher}
        sx={{ mx: 1 }}
      >
        <Add fontSize="small" sx={{ mr: 1 }} /> Cadastrar Professor
      </Button>
      <Card
        sx={{
          mt: 5,
        }}
      >
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
