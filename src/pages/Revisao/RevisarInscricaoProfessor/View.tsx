import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  ListSubheader,
} from "@mui/material";
import UserContext from "../../../context/UserContext";
import Loading from "../../../Components/Loading";
import { IDetails } from "../../Edital/Detalhes/Interfaces";
import {getDetailsProcessoSeletivo} from "../../Edital/Detalhes/Service";
import { IDetalhesInscricao } from "../Interfaces";
import { getDetalhesInscricaoProfessor } from "../Service";
import DadosCandidato from "../../Components/DadosCandidato";

export default function RevisarInscricaoProfessor() {
  const { user } = useContext(UserContext);
  const [inscricao, setInscricao] = useState<IDetalhesInscricao>();
  const [edital, setEdital] = useState<IDetails>();
  const [loadingInscricao, setLoadingInscricao] = useState<boolean>(true);
  const [loadingProcesso, setLoadingProcesso] = useState<boolean>(true);
  const { editalId, inscricaoId } = useParams();

  useEffect(() => {
    if (user && inscricaoId && editalId) {
      setLoadingInscricao(true);
      setLoadingProcesso(true);
      getDetalhesInscricaoProfessor(Number(inscricaoId), Number(editalId))
        .then(({ data }) => {
          setInscricao(data);
        })
        .catch(() => {
          // TODO: Ver como exibir erros va View
        })
        .finally(() => {
          setLoadingInscricao(false);
        });
      getDetailsProcessoSeletivo(editalId)
        .then(({ data }) => {
          setEdital(data);
        })
        .catch(() => {
          // TODO: Ver como exibir erros va View
        })
        .finally(() => {
          setLoadingProcesso(false);
        });
    }
  }, [inscricaoId, editalId, user]);

  return loadingInscricao || loadingProcesso ? (
    <Loading />
  ) : (
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
          subheader="Revisão de dados enviados na inscrição"
          subheaderTypographyProps={{
            align: "center",
          }}
        />
        <Divider sx={{ mx: 3 }} />

        <CardContent sx={{ px: { xs: 5, sm: 10 } }}>
          <DadosCandidato dadosInscrito={inscricao?.aluno} />
          <List
            component="nav"
            aria-labelledby="historico"
            subheader={
              <ListSubheader
                id="historico"
                color="primary"
                sx={{
                  fontSize: 20,
                  paddingLeft: 0,
                }}
              >
                Históricos
              </ListSubheader>
            }
          >
            {inscricao?.Historico?.map((historico) => (
              <ListItem disablePadding key={historico.id}>
                <ListItemButton href={historico.url} target="_blank" divider>
                  <Grid
                    container
                    direction="row"
                    justifyContent="space-between"
                  >
                    <ListItemText primary={`${historico.tipo}`} />
                  </Grid>
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          <List
            component="nav"
            aria-labelledby="dadosinscrito"
            subheader={
              <ListSubheader
                id="dadosinscrito"
                color="primary"
                sx={{
                  fontSize: 20,
                  paddingLeft: 0,
                }}
              >
                Produções Científicas
              </ListSubheader>
            }
          >
            {inscricao?.producoes.map((producao) => (
              <ListItem disablePadding key={producao.id} divider>
                <ListItemButton href={producao.url} target="_blank">
                  <Grid
                    container
                    direction="row"
                    justifyContent="space-between"
                  >
                    <ListItemText
                      primary={`${producao.categorias_producao_id}`}
                    />
                  </Grid>
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </CardContent>
      </Card>
    </Grid>
  );
}
