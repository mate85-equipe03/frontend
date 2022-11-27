import { Card, CardContent, CardHeader, Grid } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import NotArchived from "../components/NãoArquivado";
import UserContext from "../context/UserContext";
import { IADetalhes } from "../interfaces/Interfaces";

import {
  getDetailsProcessoSeletivo,
  /* getEnrolledList, */
  getResultadoDoutorado,
  getResultadoMestrado,
} from "../services/Api";

export default function ResultadoEdital() {
  /* const [enrolledList, setEnrolledList] = useState<IADetalhes[]>([]); */
  const [resultadoMestrado, setResultadoMestrado] = useState<IADetalhes[]>([]);
  const [resultadoDoutorado, setResultadoDoutorado] = useState<IADetalhes[]>(
    []
  );
  const { user } = useContext(UserContext);
  const { editalId } = useParams();
  const [isEditalArchived, setIsEditalArchived] = useState(true);
  const navigate = useNavigate();

  /* useEffect(() => {
    if (user && editalId) {
      getEnrolledList(editalId)
        .then(({ data }) => setEnrolledList(data))
        .catch()
        .finally();
    }
  }, [editalId, user, navigate]); */

  useEffect(() => {
    getDetailsProcessoSeletivo(editalId)
      .then(({ data }) => {
        setIsEditalArchived(data?.arquivado);
      })
      .catch()
      .finally();
  }, [editalId]);

  useEffect(() => {
    getResultadoMestrado(editalId)
      .then(({ data }) => {
        setResultadoMestrado(data);
      })
      .catch()
      .finally();
  }, [editalId, user, navigate]);

  useEffect(() => {
    getResultadoDoutorado(editalId)
      .then(({ data }) => {
        setResultadoDoutorado(data);
      })
      .catch()
      .finally();
  }, [editalId, user, navigate]);

  const colunas: GridColDef[] = [
    {
      field: "classificacao",
      headerName: "Colocação",
      width: 100,
    },
    {
      field: "nome",
      headerName: "Nome",
      width: 300,
      valueGetter: (params) => params.row.aluno.nome,
    },
    {
      field: "matricula",
      headerName: "Matrícula",
      width: 100,
      valueGetter: (params) => params.row.aluno.matricula,
    },
    {
      field: "curso",
      headerName: "Curso",
      width: 100,
      valueGetter: (params) => params.row.aluno.curso,
    },
    {
      field: "nota_final",
      headerName: "Nota Final",
      width: 100,
    },
  ];

  const allColumnsWidth = colunas.reduce((acc, { width }) => {
    return width ? acc + width : acc;
  }, 0);

  return !isEditalArchived ? (
    <NotArchived />
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
          title="Resultado Final Mestrado"
          titleTypographyProps={{
            align: "center",
            variant: "h4",
          }}
        />
        <CardContent sx={{ px: 10 }}>
          <DataGrid
            initialState={{
              sorting: {
                sortModel: [{ field: "nota_final", sort: "desc" }],
              },
            }}
            disableSelectionOnClick
            rows={resultadoMestrado}
            columns={colunas}
            sx={{
              width: Math.min(allColumnsWidth + 2, 1000),
              mb: 5,
            }}
          />

          <CardHeader
            title="Resultado Final Doutorado"
            titleTypographyProps={{
              align: "center",
              variant: "h4",
            }}
          />

          <DataGrid
            initialState={{
              sorting: {
                sortModel: [{ field: "nota_final", sort: "desc" }],
              },
            }}
            disableSelectionOnClick
            rows={resultadoDoutorado}
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
