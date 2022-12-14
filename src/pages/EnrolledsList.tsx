import {
  Alert,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  Tooltip,
} from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { DataGrid, GridColDef, GridEventListener } from "@mui/x-data-grid";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import WarningIcon from "@mui/icons-material/Warning";
import CheckIcon from "@mui/icons-material/Check";
import {
  getEnrolledList,
  getDetailsProcessoSeletivo,
  patchLiberarResultado,
} from "../services/Api";
import { IADetalhes } from "../interfaces/Interfaces";
import UserContext from "../context/UserContext";
import Loading from "../components/Loading";

export default function EnrolledsList() {
  const navigate = useNavigate();
  const location = useLocation();
  const [editalName, setEditalName] = useState<string>();

  const { editalId } = useParams();
  const { user } = useContext(UserContext);

  const [enrolledList, setEnrolledList] = useState<IADetalhes[]>([]);
  const [loadingInscritos, setLoadingInscritos] = useState<boolean>(false);
  const [loadingProcesso, setLoadingProcesso] = useState<boolean>(false);
  const [loadingPatchLiberarResultado, setLoadingPatchLiberarResultado] =
    useState<boolean>(false);
  const [faltaRevisarOuAuditar, setFaltaRevisarOuAuditar] =
    useState<boolean>(true);
  const [isResultadoLiberado, setIsResultadoLiberado] =
    useState<boolean>(false);

  const revisaoSuccess = location.state ? "revisao" in location.state : false;
  const auditoriaSuccess = location.state
    ? "auditoria" in location.state
    : false;
  window.history.replaceState(null, "");

  useEffect(() => {
    if (user && editalId) {
      setLoadingInscritos(true);
      getEnrolledList(editalId)
        .then(({ data }) => {
          setEnrolledList(data);
          setFaltaRevisarOuAuditar(
            data.some((inscricao) => !inscricao.revisor || !inscricao.auditor)
          );
        })
        .catch()
        .finally(() => {
          setLoadingInscritos(false);
        });
    }
  }, [editalId, user]);

  const handleRowClick: GridEventListener<"rowClick"> = (params) => {
    navigate(`/edital/${editalId}/inscritos/${params.row.id}`);
  };

  const handleClickLiberarResultado = () => {
    setLoadingPatchLiberarResultado(true);
    patchLiberarResultado(Number(editalId))
      .then(() => navigate("/", { state: { resultadoLiberado: true } }))
      .catch()
      .finally(() => setLoadingPatchLiberarResultado(false));
  };

  useEffect(() => {
    setLoadingProcesso(true);
    getDetailsProcessoSeletivo(editalId)
      .then(({ data }) => {
        setEditalName(data?.titulo);
        setIsResultadoLiberado(data?.resultado_liberado);
      })
      .catch()
      .finally(() => {
        setLoadingProcesso(false);
      });
  }, [editalId]);

  const checkSuccessMessage = (): string | null => {
    if (revisaoSuccess) {
      return "Inscri????o revisada com sucesso.";
    }

    if (auditoriaSuccess) {
      return "Inscri????o auditada com sucesso.";
    }

    return null;
  };

  const colunas: GridColDef[] = [
    {
      field: "nome",
      headerName: "Nome",
      width: 300,
      valueGetter: (params) => params.row.aluno.nome,
    },
    {
      field: "curso",
      headerName: "Curso",
      width: 120,
      valueGetter: (params) => params.row.aluno.curso,
    },

    {
      field: "statusRevisao",
      headerName: "Revisada por",
      width: 280,
      valueGetter: (params) => params.row.revisor_id,
      renderCell: (cellValues) => {
        return cellValues.row.revisor_id ? (
          <Grid
            sx={{
              color: "success.main",
              fontWeight: "bold",
              mr: 2,
              width: "100%",
              overflow: "hidden",
              whiteSpace: "nowrap",
              textOverflow: "ellipsis",
            }}
          >
            <CheckCircleIcon fontSize="small" sx={{ mr: 0.5 }} />
            {cellValues.row.revisor.nome}
          </Grid>
        ) : (
          <Grid
            sx={{
              color: "warning.light",
              fontWeight: "bold",
              mr: 2,
              width: "100%",
              overflow: "hidden",
              whiteSpace: "nowrap",
              textOverflow: "ellipsis",
            }}
          >
            <WarningIcon fontSize="small" sx={{ mr: 0.5 }} />A revisar
          </Grid>
        );
      },
    },
    {
      field: "statusAuditoria",
      headerName: "Auditada por",
      width: 280,
      valueGetter: (params) => params.row.auditor_id,
      renderCell: (cellValues) => {
        return cellValues.row.auditor_id ? (
          <Grid
            sx={{
              color: "success.main",
              fontWeight: "bold",
              mr: 2,
              width: "100%",
              overflow: "hidden",
              whiteSpace: "nowrap",
              textOverflow: "ellipsis",
            }}
          >
            <CheckCircleIcon fontSize="small" sx={{ mr: 0.5 }} />
            {cellValues.row.auditor.nome}
          </Grid>
        ) : (
          <Grid
            sx={{
              color: "warning.light",
              fontWeight: "bold",
              mr: 2,
              width: "100%",
              overflow: "hidden",
              whiteSpace: "nowrap",
              textOverflow: "ellipsis",
            }}
          >
            <WarningIcon fontSize="small" sx={{ mr: 0.5 }} />A auditar
          </Grid>
        );
      },
    },
  ];

  const allColumnsWidth = colunas.reduce((acc, { width }) => {
    return width ? acc + width : acc;
  }, 0);

  const successMessage = checkSuccessMessage();

  const getButtonResultado = (): JSX.Element => {
    return faltaRevisarOuAuditar ? (
      <Tooltip
        title="Para liberar o resultado, todas as inscri????es t??m que estar revisadas e auditadas."
        followCursor
      >
        <span>
          <Button type="button" size="large" sx={{ m: 2 }} disabled>
            <WarningIcon sx={{ mr: 1 }} />
            Liberar Resultado
          </Button>
        </span>
      </Tooltip>
    ) : (
      <Button
        type="button"
        size="large"
        onClick={handleClickLiberarResultado}
        sx={{ m: 2 }}
        disabled={loadingPatchLiberarResultado}
      >
        {loadingPatchLiberarResultado ? (
          <Loading />
        ) : (
          <>
            <CheckIcon sx={{ mr: 1 }} />
            Liberar Resultado
          </>
        )}
      </Button>
    );
  };

  return loadingInscritos || loadingProcesso ? (
    <Loading />
  ) : (
    <Grid
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
      sx={{ width: "100%" }}
    >
      {successMessage && (
        <Alert severity="success" sx={{ mb: 2 }}>
          {successMessage}
        </Alert>
      )}

      {isResultadoLiberado ? (
        <Grid sx={{ color: "success.main", fontWeight: "bold" }}>
          <CheckCircleIcon fontSize="small" sx={{ mr: 1 }} />O resultado j?? foi
          liberado
        </Grid>
      ) : (
        getButtonResultado()
      )}

      <Card sx={{ py: 2, mt: 5 }}>
        <CardHeader
          title="Estudantes Inscritos(as)"
          titleTypographyProps={{
            align: "center",
            variant: "h4",
          }}
          subheader={editalName}
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
            onRowClick={handleRowClick}
            disableSelectionOnClick
            rows={enrolledList}
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
