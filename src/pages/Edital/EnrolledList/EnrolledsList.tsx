import { Alert, Card, CardContent, CardHeader, Divider, Grid } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { DataGrid, GridColDef, GridEventListener } from "@mui/x-data-grid";
import { IDetails, IInscritos } from "../Detalhes/Interfaces";
import getDetailsProcessoSeletivo from "../Detalhes/Service";
import getEnrolledList from "../Detalhes/ServiceEnrolledList";

export default function EnrolledsList() {
  const navigate = useNavigate();
  const [edital, setEdital] = useState<IDetails | undefined>();

  const { editalId } = useParams();

  const [enrolledList, setEnrolledList] = useState([])

  useEffect(() => {
    //getEnrolledList(editalId)
      fetch("https://jsonplaceholder.typicode.com/posts")
      .then((data) => data.json()) 
      .then((data) =>  setEnrolledList(data))
  })

  // const [loading, setLoading] = useState<boolean>(true);
  
  const [message, setMessage] = useState('');

  const handleRowClick: GridEventListener<'rowClick'> = (params) => {
    navigate(`/edital/${editalId}/inscritos/${params.row.id}`)
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
    { field: "title", headerName: "Title", width: 250 },
    { field: "body", headerName: "Body", width: 130 },
  ];

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
          <div style={{ height: 370, width: 800 }}>
            <DataGrid
              onRowClick={handleRowClick} {...enrolledList}
              rows={enrolledList}
              columns={colunas}
              pageSize={5}
              rowsPerPageOptions={[5]}
            />
          </div>
        </CardContent>
      </Card>
    </Grid>
  );
}
