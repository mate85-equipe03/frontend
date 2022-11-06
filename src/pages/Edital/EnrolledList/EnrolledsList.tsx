import { Card, CardContent, CardHeader, Divider, Grid } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { DataGrid, GridColDef, GridEventListener } from "@mui/x-data-grid";
import { getEnrolledList } from "./Service";
import { IADetalhes } from "./Interfaces";
import getDetailsProcessoSeletivo from "../Detalhes/Service";
import UserContext from "../../../context/UserContext";
import Loading from "../../../Components/Loading";

export default function EnrolledsList() {
  const navigate = useNavigate();
  const [editalName, setEditalName] = useState<string>();

  const { editalId } = useParams();

  const { user } = useContext(UserContext);

  const [enrolledList, setEnrolledList] = useState<IADetalhes[]>([]);
  const [loadingInscritos, setLoadingInscritos] = useState<boolean>(false);
  const [loadingProcesso, setLoadingProcesso] = useState<boolean>(false);

  useEffect(() => {
    if (user && editalId) {
      setLoadingInscritos(true);
      getEnrolledList(editalId)
        .then(({ data }) => setEnrolledList(data))
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

  const colunas: GridColDef[] = [
    {
      field: "nome",
      headerName: "Nome",
      width: 300,
      valueGetter: (params) => {
        return params.getValue(params.id, "aluno").nome;
      },
    },
    {
      field: "curso",
      headerName: "Curso",
      width: 100,
      valueGetter: (params) => {
        return params.getValue(params.id, "aluno").curso;
      },
    },
    {
      field: "semestre",
      headerName: "Semestre de Ingresso",
      width: 200,
      valueGetter: (params) => {
        return params.getValue(params.id, "aluno").semestre_pgcomp;
      },
    },
  ];

  const allColumnsWidth = colunas.reduce((acc, { width }) => {
    return width ? acc + width : acc;
  }, 0);

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
            onRowClick={handleRowClick}
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
