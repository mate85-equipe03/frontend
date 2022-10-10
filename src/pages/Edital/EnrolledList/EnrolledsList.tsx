/* eslint-disable react/jsx-props-no-spreading */

import { Card, CardContent, CardHeader, Divider, Grid } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { DataGrid, GridColDef, GridEventListener } from "@mui/x-data-grid";
import { IADetalhes, IDetails } from "../Detalhes/Interfaces";
import getDetailsProcessoSeletivo from "../Detalhes/Service";
import getEnrolledList from "../Detalhes/ServiceEnrolledList";
import UserContext from "../../../context/UserContext";

export default function EnrolledsList() {
  const navigate = useNavigate();
  const [edital, setEdital] = useState<IDetails | undefined>();

  const { editalId } = useParams();

  const { user } = useContext(UserContext);

  const [enrolledList, setEnrolledList] = useState<IADetalhes[]>([]);

  useEffect(() => {
    if (user)
      getEnrolledList(editalId, user?.token).then(({ data }) =>
        setEnrolledList(data)
      );
  }, [editalId, user]);

  // const [loading, setLoading] = useState<boolean>(true);

  const handleRowClick: GridEventListener<"rowClick"> = (params) => {
    navigate(`/edital/${editalId}/inscritos/${params.row.id}`);
  };

  useEffect(() => {
    getDetailsProcessoSeletivo(editalId)
      .then(({ data }) => {
        setEdital(data);
      })
      .catch(() => {
        // TODO: Ver como exibir erros va View
      });
  }, [editalId]);

  const colunas: GridColDef[] = [
    { field: "id", headerName: "ID", width: 50 },
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

  const localizedTextsMap = {
    columnMenuUnsort: "Não classificado",
    columnMenuSortAsc: "Classificar por ordem crescente",
    columnMenuSortDesc: "Classificar por ordem decrescente",
    columnMenuFilter: "Filtro",
    columnMenuHideColumn: "Ocultar",
    columnMenuShowColumns: "Mostrar colunas",
  };

  return (
    <Grid
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
      sx={{ width: "100%" }}
    >
      <Card sx={{ minWidth: { md: 500 }, maxWidth: 1920, mt: 5 }}>
        <CardHeader
          title="Estudantes inscritos(as)"
          titleTypographyProps={{
            align: "center",
          }}
          subheader={edital?.titulo}
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
              pageSize={10}
              rowsPerPageOptions={[5]}
              localeText={localizedTextsMap}
            />
          </div>
        </CardContent>
      </Card>
    </Grid>
  );
}
