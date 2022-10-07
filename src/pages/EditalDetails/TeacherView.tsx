import {
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import EnrolledTable from "../../Components/EnrolledTable";
import { IDetails } from "./Types";
import getDetailsProcessoSeletivo from "./Service";
// import UserContext from "../../context/UserContext";

export default function TeacherView() {
  // const navigate = useNavigate();
  // const { user } = useContext(UserContext);
  const [edital, setEdital] = useState<IDetails | undefined>();
  // const [loading, setLoading] = useState<boolean>(true); // Definir se faz sentido usar
  const { editalId } = useParams();

  useEffect(() => {
    // setLoading(true);
    getDetailsProcessoSeletivo(editalId)
      .then(({ data }) => {
        setEdital(data);
      })
      .catch(() => {
        // TODO: Ver como exibir erros va View
      })
      .finally(() => {
        // setLoading(false);
      });
  });

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
          title={edital?.titulo}
          titleTypographyProps={{
            align: "center",
            variant: "h4",
            p: 1,
          }}
          subheader={
            edital?.arquivado ? (
              <Typography sx={{ fontSize: 20, color: "primary.main" }}>
                Resultados disponíveis
              </Typography>
            ) : (
              <Typography sx={{ fontSize: 20, color: "primary.main" }}>
                Processo seletivo ainda aberto
              </Typography>
            )
          }
        />

        <Divider sx={{ mx: 3 }} />

        <CardContent sx={{ px: { xs: 5, sm: 10 } }}>
          <Grid
            container
            direction="column"
            justifyContent="center"
            alignItems="center"
            sx={{ width: "100%" }}
          >
            <Grid
              container
              direction="column"
              justifyContent="center"
              alignItems="center"
              sx={{ width: "100%", my: 2 }}
            />
          </Grid>
          <EnrolledTable />
        </CardContent>
      </Card>
    </Grid>
  );
}
