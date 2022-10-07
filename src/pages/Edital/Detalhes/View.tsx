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
import UserContext from "../../../context/UserContext";
import { IDetails } from "./Interfaces";
import getDetailsProcessoSeletivo from "./Service";

export default function EditalDetails() {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const [edital, setEdital] = useState<IDetails | undefined>();
  // const [loading, setLoading] = useState<boolean>(true); Definir se faz sentido usar
  const [isInscrito] = useState<boolean>(false); // Adicionar função para ficar dinâmico, quando tiver o retorno do backend
  const { editalId } = useParams();

  const redirectToSubscribe = () => {
    navigate(`/edital/${editalId}/inscricao`);
  };

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
  }, [editalId]);

  const dateToStr = (rawDate: string) => {
    const date = moment(rawDate);
    return date.format("DD/MM/YYYY");
  };

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
          title={edital?.titulo}
          titleTypographyProps={{
            align: "center",
            variant: "h4",
            p: 1,
          }}
          sx={{ px: 3 }}
          subheader={edital?.descricao}
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
            <List>
              {edital?.etapas.map((etapa) => (
                <ListItem disablePadding key={etapa.id}>
                  <ListItemText
                    primary={`${etapa.name} : ${dateToStr(etapa.data_inicio)} a 
                          ${dateToStr(etapa.data_fim)}`}
                  />
                </ListItem>
              ))}
            </List>
            <Link
              href={edital?.edital_url}
              underline="none"
              target="_blank"
              sx={{ my: 1 }}
            >
              <PictureAsPdfIcon />
              {`${edital?.titulo}.pdf`}
            </Link>
            <Grid
              container
              direction="column"
              justifyContent="center"
              alignItems="center"
              sx={{ width: "100%", my: 2 }}
            >
              {edital?.arquivado ? (
                <Typography sx={{ fontSize: 20, color: "primary.main" }}>
                  Resultados disponíveis {/* link para resultado */}
                </Typography>
              ) : (
                <Grid>
                  {user && isInscrito ? (
                    <Typography sx={{ fontSize: 20, color: "primary.main" }}>
                      Inscrito(a)
                    </Typography>
                  ) : (
                    <Button
                      type="button"
                      onClick={redirectToSubscribe}
                      size="large"
                    >
                      Inscreva-se
                    </Button>
                  )}
                </Grid>
              )}
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Grid>
  );
}
