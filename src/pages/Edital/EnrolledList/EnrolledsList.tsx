/* eslint-disable react/jsx-props-no-spreading */

import { Card, CardContent, CardHeader, Divider, Grid } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { DataGrid, GridColDef, GridEventListener } from "@mui/x-data-grid";
import { getEnrolledList } from "./Service";
import { IADetalhes } from "./Interfaces";
import getDetailsProcessoSeletivo from "../Detalhes/Service";
import UserContext from "../../../context/UserContext";

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

  // const [loading, setLoading] = useState<boolean>(true);

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

  const localizedTextsMap = {
    noRowsLabel: "Sem inscrições",
    columnMenuUnsort: "Não classificado",
    columnMenuSortAsc: "Classificar por ordem crescente",
    columnMenuSortDesc: "Classificar por ordem decrescente",
    columnMenuFilter: "Filtro",
    columnMenuHideColumn: "Ocultar",
    columnMenuShowColumns: "Mostrar colunas",
    columnsPanelTextFieldLabel: "Encontrar Colunas",
    columnsPanelTextFieldPlaceholder: "Titulo das Colunas",
    columnsPanelDragIconLabel: "Reordenar Colunas",
    columnsPanelShowAllButton: "Mostrar todas",
    columnsPanelHideAllButton: "Esconder todas",
    filterOperatorContains: "Contém",
    filterOperatorEquals: "É igual",
    filterOperatorStartsWith: "Começa com",
    filterOperatorEndsWith: "Termina com",
    filterOperatorIs: "É",
    filterOperatorNot: "Não é",
    filterOperatorAfter: "Está depois",
    filterOperatorOnOrAfter: "Está em ou depois",
    filterOperatorBefore: "Está antes",
    filterOperatorOnOrBefore: "Está em ou antes",
    filterOperatorIsEmpty: "É vazio",
    filterOperatorIsNotEmpty: "Não é vazio",
    filterOperatorIsAnyOf: "É qualquer um de",
    filterPanelAddFilter: "Adiciona filtro",
    filterPanelDeleteIconLabel: "Deletar",
    filterPanelLinkOperator: "Operador lógico",
    filterPanelOperators: "Operador",
    filterPanelOperatorAnd: "E",
    filterPanelOperatorOr: "Ou",
    filterPanelColumns: "Colunas",
    filterPanelInputLabel: "Valor",
    filterPanelInputPlaceholder: "Filtrar valor",
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
              pageSize={10}
              rowsPerPageOptions={[5, 10, 15, 20]}
              localeText={localizedTextsMap}
            />
          </div>
        </CardContent>
      </Card>
    </Grid>
  );
}
