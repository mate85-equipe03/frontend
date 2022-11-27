import { Card, CardContent, CardHeader, Grid } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "../components/Loading";
import NotArchived from "../components/NãoArquivado";
import UserContext from "../context/UserContext";
import { IADetalhes } from "../interfaces/Interfaces";

import {
  getDetailsProcessoSeletivo,
  getResultadoDoutorado,
  getResultadoMestrado,
} from "../services/Api";

export default function ResultadoEdital() {
  const [resultadoMestrado, setResultadoMestrado] = useState<IADetalhes[]>([]);
  const [resultadoDoutorado, setResultadoDoutorado] = useState<IADetalhes[]>(
    []
  );
  const { user } = useContext(UserContext);

  const params = useParams();
  const editalId = Number(params.editalId) ? Number(params.editalId) : null;

  const [isLoadingPSDetalhes, setIsLoadingPSDetalhes] = useState(false);
  const [isLoadingMestrado, setIsLoadingMestrado] = useState(false);
  const [isLoadingDoutorado, setIsLoadingDoutorado] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setIsLoadingPSDetalhes(true);
    getDetailsProcessoSeletivo(editalId)
      .then(({ data }) => {
        if (data.arquivado === true) {
          navigate(`edital/${editalId}/inscricao`)
        }
      })
      .catch()
      .finally(() => {
        setIsLoadingPSDetalhes(false);
      });
  }, [editalId]);

  useEffect(() => {
    setIsLoadingMestrado(true);
      getResultadoMestrado(editalId)
      .then(({ data }) => {
        setResultadoMestrado(data);
      })
      .catch()
      .finally(() => {
        setIsLoadingMestrado(false);
      });
      }, [editalId]);


  useEffect(() => {
    setIsLoadingDoutorado(true);
    getResultadoDoutorado(editalId)
      .then(({ data }) => {
        setResultadoDoutorado(data);
      })
      .catch()
      .finally(() => {
        setIsLoadingDoutorado(false);
      });
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

  return isLoadingPSDetalhes || isLoadingMestrado || isLoadingDoutorado  ? (
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
