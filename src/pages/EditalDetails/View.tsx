import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Button,
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
import { IDetails } from "./Types";
import getDetailsProcessoSeletivo from "./Service";

export default function EditalDetails() {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const [edital, setEdital] = useState<IDetails | undefined>();
  // const [loading, setLoading] = useState<boolean>(true); Definir se faz sentido usar
  const [isInscrito, setIsInscrito] = useState<boolean>(true);
  const { edital_id } = useParams();

  const redirectToSubscribe = () => {
    navigate("/inscricao");
  };

  useEffect(() => {
    // setLoading(true);
    getDetailsProcessoSeletivo(edital_id)
      .then(({ data }) => {
        setEdital(data);
      })
      .catch(() => {
        // TODO: Ver como exibir erros va View
      })
      .finally(() => {
        // setLoading(false);
      });
  }, []);

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
      <Typography sx={{ fontSize: 40, color: "primary.main" }}>
        {edital?.titulo}
      </Typography>
      <Typography sx={{ fontSize: 30, color: "primary.main" }}>
        {edital?.descricao}
      </Typography>
      <List>
        {edital?.etapas.map((etapa) => (
          <ListItem disablePadding>
            <ListItemText
              primary={`${etapa.name} : ${dateToStr(etapa.data_inicio)} a 
                ${dateToStr(etapa.data_fim)}`}
            />
          </ListItem>
        ))}
      </List>
      <Link href={edital?.edital_url} underline="none" target="_blank">
        <PictureAsPdfIcon />
        {`${edital?.titulo}.pdf`}
      </Link>
      {edital?.arquivado ? (
        <Typography sx={{ fontSize: 20, color: "primary.main" }}>
          Resultados disponíveis
        </Typography>
      ) : (
        <Grid
          container
          direction="column"
          justifyContent="center"
          alignItems="center"
          sx={{ width: "100%" }}
        >
          {user && isInscrito ? (
            <Typography sx={{ fontSize: 20, color: "primary.main" }}>
              Inscrito(a)
            </Typography>
          ) : (
            <Button type="button" onClick={redirectToSubscribe} size="large">
              Inscreva-se
            </Button>
          )}
        </Grid>
      )}
    </Grid>
  );
}
