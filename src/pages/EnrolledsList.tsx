import {
  Alert,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
} from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { DataGrid, GridColDef, GridEventListener } from "@mui/x-data-grid";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import WarningIcon from "@mui/icons-material/Warning";
import { getDetailsProcessoSeletivo } from "./Edital/Detalhes/Service";
import UserContext from "../context/UserContext";
import Loading from "../Components/Loading";
import { getEnrolledList } from "./Edital/EnrolledList/Service";
import { IADetalhes } from "./Edital/EnrolledList/Interfaces";

export default function EnrolledsList() {
  const navigate = useNavigate();
  const location = useLocation();
  const [editalName, setEditalName] = useState<string>();

  const { editalId } = useParams();

  const { user } = useContext(UserContext);

  const [enrolledList, setEnrolledList] = useState<IADetalhes[]>([]);
  const [loadingInscritos, setLoadingInscritos] = useState<boolean>(false);
  const [loadingProcesso, setLoadingProcesso] = useState<boolean>(false);

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
        })
        .catch(() => {
          // TODO: Ver como exibir erros va View
        })
        .finally(() => {
          setLoadingInscritos(false);
        });
    }
  }, [editalId, user, navigate]);

  const handleRowClick: GridEventListener<"rowClick"> = (params) => {
    navigate(`/edital/${editalId}/inscritos/${params.row.id}`);
  };

  useEffect(() => {
    setLoadingProcesso(true);
    getDetailsProcessoSeletivo(editalId)
      .then(({ data }) => {
        setEditalName(data?.titulo);
      })
      .catch(() => {
        // TODO: Ver como exibir erros va View
      })
      .finally(() => {
        setLoadingProcesso(false);
      });
  }, [editalId]);

  const checkSuccessMessage = (): string | null => {
    if (revisaoSuccess) {
      return "Inscrição revisada com sucesso.";
    }

    if (auditoriaSuccess) {
      return "Inscrição auditada com sucesso.";
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
      width: 100,
      valueGetter: (params) => params.row.aluno.curso,
    },
    {
      field: "semestre_pgcomp",
      headerName: "Semestre de Ingresso",
      width: 200,
      valueGetter: (params) => params.row.aluno.semestre_pgcomp,
    },
    {
      field: "statusRevisao",
      headerName: "Status da Revisão",
      width: 150,
      valueGetter: (params) => params.row.revisor_id,
      renderCell: (cellValues) => {
        return cellValues.row.revisor_id ? (
          <Grid sx={{ color: "success.main", fontWeight: "bold" }}>
            <CheckCircleIcon fontSize="small" sx={{ mr: 0.5 }} />
            Revisada
          </Grid>
        ) : (
          <Grid sx={{ color: "warning.light", fontWeight: "bold" }}>
            <WarningIcon fontSize="small" sx={{ mr: 0.5 }} />A revisar
          </Grid>
        );
      },
    },
    {
      field: "statusAuditoria",
      headerName: "Status da Auditoria",
      width: 150,
      valueGetter: (params) => params.row.auditor_id,
      renderCell: (cellValues) => {
        return cellValues.row.auditor_id ? (
          <Grid sx={{ color: "success.main", fontWeight: "bold" }}>
            <CheckCircleIcon fontSize="small" sx={{ mr: 0.5 }} />
            Auditada
          </Grid>
        ) : (
          <Grid sx={{ color: "warning.light", fontWeight: "bold" }}>
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
