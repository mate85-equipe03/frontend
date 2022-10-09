import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  Link,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import moment from "moment";
import UserContext from "../../context/UserContext";
import { ADetalhes } from "./Interfaces";
import getDetalhesAluno from "./Service";

export default function RevisarInscricao() {
  const { user } = useContext(UserContext);
  const [inscricao, setInscricao] = useState<ADetalhes | undefined>();
  // const [loading, setLoading] = useState<boolean>(true); Definir se faz sentido usar
  const { editalId, inscricaoId} = useParams();


  useEffect(() => {
    // setLoading(true);
    getDetalhesAluno(inscricaoId, editalId, user?.token)
      .then(({ data }) => {
        setInscricao(data);
      })
      .catch(() => {
        // TODO: Ver como exibir erros va View
      })
      .finally(() => {
        // setLoading(false);
      });
  }, [inscricaoId, editalId]);

  return (
    <Grid
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
      sx={{ width: "100%" }}
    >
      <Card sx={{ minWidth: { md: 500 }, maxWidth: 800, mt: 5 }}>
        <CardHeader
          title="Aluno tal"
          titleTypographyProps={{
            align: "center",
            variant: "h4",
            p: 1,
          }}
          sx={{ px: 3 }}
          subheader="dados enviados na inscrição"
          subheaderTypographyProps={{
            align: "center",
          }}
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
            >
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Grid>
  );
}
