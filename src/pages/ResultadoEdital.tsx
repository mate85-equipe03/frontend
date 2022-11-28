import {
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  Typography,
} from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "../components/Loading";
import UserContext from "../context/UserContext";
import { IADetalhes, IEdital } from "../interfaces/Interfaces";
import {
  getDetailsProcessoSeletivo,
  getEtapaAtualProcessoSeletivo,
  getResultadoDoutorado,
  getResultadoMestrado,
} from "../services/Api";
import editalService from "../services/Edital";

export default function ResultadoEdital() {
  const [edital, setEdital] = useState<IEdital>();
  const [resultadoMestrado, setResultadoMestrado] = useState<IADetalhes[]>([]);
  const [resultadoDoutorado, setResultadoDoutorado] = useState<IADetalhes[]>(
    []
  );
  const { user } = useContext(UserContext);
  const { editalId } = useParams();
  const [isLoadingMestrado, setIsLoadingMestrado] = useState<boolean>(true);
  const [isLoadingDoutorado, setIsLoadingDoutorado] = useState<boolean>(true);
  const [isLoadingPSDetails, setIsLoadingPSDetails] = useState<boolean>(true);
  const [loadingEtapaAtual, setLoadingEtapaAtual] = useState<boolean>(true);
  const navigate = useNavigate();

  useEffect(() => {
    const redirectToDetails = () => {
      navigate(`/edital/${editalId}/detalhes`);
    };

    const editalIdNumber = Number(editalId);

    if (editalIdNumber) {
      setIsLoadingPSDetails(true);
      setIsLoadingMestrado(true);
      setIsLoadingDoutorado(true);
      setLoadingEtapaAtual(true);

      getDetailsProcessoSeletivo(editalIdNumber)
        .then(({ data }) => {
          setEdital(data);
        })
        .catch()
        .finally(() => {
          setIsLoadingPSDetails(false);
        });

      getResultadoMestrado(editalIdNumber)
        .then(({ data }) => {
          setResultadoMestrado(data);
        })
        .catch()
        .finally(() => {
          setIsLoadingMestrado(false);
        });

      getResultadoDoutorado(editalIdNumber)
        .then(({ data }) => {
          setResultadoDoutorado(data);
        })
        .catch()
        .finally(() => {
          setIsLoadingDoutorado(false);
        });

      getEtapaAtualProcessoSeletivo(editalIdNumber)
        .then(({ data }) => {
          const isResultadoDisponivel =
            editalService.isResultadoDisponivel(data);
          if (!isResultadoDisponivel) {
            redirectToDetails();
          }
        })
        .catch()
        .finally(() => {
          setLoadingEtapaAtual(false);
        });
    }
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

  return isLoadingPSDetails ||
    isLoadingMestrado ||
    isLoadingDoutorado ||
    loadingEtapaAtual ? (
    <Loading />
  ) : (
    <Grid
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
      sx={{ width: "100%", mt: 5 }}
    >
      <Card>
        <CardHeader
          title="Resultado Final"
          titleTypographyProps={{
            align: "center",
            variant: "h4",
            p: 1,
          }}
          subheader={edital?.titulo}
          subheaderTypographyProps={{
            align: "center",
          }}
          sx={{}}
        />

        <Divider sx={{ mx: 8 }} />

        <CardContent sx={{ px: 10, mt: 2 }}>
          <Typography sx={{ pb: 1 }} align="center" variant="h6">
            Mestrado
          </Typography>
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

          <Typography sx={{ pb: 1 }} align="center" variant="h6">
            Doutorado
          </Typography>
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
