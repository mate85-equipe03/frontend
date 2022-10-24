/* eslint-disable react/jsx-props-no-spreading */

import { Card, CardContent, CardHeader, Divider, Grid } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  DataGrid,
  GridColDef,
  GridEventListener,
  ptBR,
} from "@mui/x-data-grid";
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

  useEffect(() => {
    if (user && editalId)
      getEnrolledList(editalId).then(({ data }) => setEnrolledList(data));
  }, [editalId, user, navigate]);

  const [loading, setLoading] = useState<boolean>(true);

  const handleRowClick: GridEventListener<"rowClick"> = (params) => {
    navigate(`/edital/${editalId}/inscritos/${params.row.id}`);
  };

  useEffect(() => {
    getDetailsProcessoSeletivo(editalId)
      .then(({ data }) => {
        setEditalName(data?.titulo);
      })
      .catch(() => {
        // TODO: Ver como exibir erros va View
      })
      .finally(() => {
        setLoading(false);
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

  return loading ? (
    <Loading />
  ) : (
    <Grid
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
      sx={{ width: "100%" }}
    >
      <Card sx={{ minWidth: { md: 500 }, maxWidth: 1920, mt: 5 }}>
        <CardHeader
          title="Estudantes Inscritos(as)"
          titleTypographyProps={{
            align: "center",
          }}
          subheader={editalName}
          subheaderTypographyProps={{
            align: "center",
          }}
        />

        <Divider sx={{ mx: 3 }} />

        <CardContent sx={{ px: { xs: 5, sm: 10 } }}>
          <div style={{ height: 400, width: 700 }}>
            <DataGrid
              onRowClick={handleRowClick}
              {...enrolledList}
              rows={enrolledList}
              columns={colunas}
              pageSize={5}
              rowsPerPageOptions={[5, 10, 15, 20]}
              localeText={ptBR.components.MuiDataGrid.defaultProps.localeText}
            />
          </div>
        </CardContent>
      </Card>
    </Grid>
  );
}
