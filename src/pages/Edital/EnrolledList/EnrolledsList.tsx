import { Card, CardContent, CardHeader, Divider, Grid } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { IDetails, IInscritos } from "../Detalhes/Interfaces";
import getDetailsProcessoSeletivo from "../Detalhes/Service";
import getEnrolledList from "../Detalhes/ServiceEnrolledList";
import EnrolledTable from "./EnrolledTable";

export default function EnrolledsList() {
  // const navigate = useNavigate();
  // const [listaInscritos, setListInscritos] = useState<IInscritos | undefined>();
  const [edital, setEdital] = useState<IDetails | undefined>();
  // const [loading, setLoading] = useState<boolean>(true);
  const { editalId } = useParams();

  useEffect(() => {
    getEnrolledList(editalId)
      .then(({ data }) => {
        // setListInscritos(data);
      })
      .catch(() => {
        // TODO: Ver como exibir erros va View
      });
  }, [editalId]);

  useEffect(() => {
    getDetailsProcessoSeletivo(editalId)
      .then(({ data }) => {
        setEdital(data);
      })
      .catch(() => {
        // TODO: Ver como exibir erros va View
      });
  }, [editalId]);

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
          <EnrolledTable />
        </CardContent>
      </Card>
    </Grid>
  );
}
