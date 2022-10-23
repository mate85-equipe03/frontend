import React, { useContext, useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import {
  Alert,
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
import { IDetalhes } from "../Interfaces";
import { getDetalhesInscricaoAluno } from "../Service";
import Loading from "../../../Components/Loading";
import getDetailsProcessoSeletivo from "../../Edital/Detalhes/Service";
import { IDetails } from "../../Edital/Detalhes/Interfaces";
import DadosCandidato from "../../Components/DadosCandidato";
import ModalProducao from "../../Edital/Inscricao/Components/ModalProducao";

export default function RevisarInscricaoAluno() {
  const { user } = useContext(UserContext);
  const [inscricao, setInscricao] = useState<IDetalhes | undefined>();
  const [edital, setEdital] = useState<IDetails | undefined>();
  const [loadingAluno, setLoadingAluno] = useState<boolean>(true);
  const [loadingProcesso, setLoadingProcesso] = useState<boolean>(true);
  const { editalId, inscricaoId } = useParams();

  const refreshData = () => {
    if (user && editalId) {
      setLoadingAluno(true);
      setLoadingProcesso(true);
      getDetalhesInscricaoAluno(editalId)
        .then(({ data }) => {
          setInscricao(data);
        })
        .catch(() => {
          // TODO: Ver como exibir erros va View
        })
        .finally(() => {
          setLoadingAluno(false);
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
          window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
        });
    }
  };

  const [addedProducao, setaddedProducao] = React.useState<boolean>(false);

  const addProducao = () => {
    refreshData();
    setaddedProducao(true);
  };

  useEffect(() => {
    refreshData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inscricaoId, editalId, user]);

  const location = useLocation();
  const inscricaoSuccess = location.state
    ? "inscricao" in location.state
    : false;
  window.history.replaceState(null, "");

  return loadingAluno || loadingProcesso ? (
    <Loading />
  ) : (
    <Grid
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
      sx={{ width: "100%" }}
    >
      {inscricaoSuccess && (
        <Alert severity="success">
          Inscrição realizada com sucesso.
          <br />
          Para finalizar a inscrição, inclua produções científicas.
        </Alert>
      )}
      {addedProducao && (
        <Alert severity="success">
          Produção científica adicionada com sucesso.
        </Alert>
      )}

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
          <List
            component="nav"
            aria-labelledby="status-inscricao"
            subheader={
              <ListSubheader
                id="status-inscricao"
                color="primary"
                sx={{
                  fontSize: 20,
                  paddingLeft: 0,
                }}
              >
                Status da Inscrição
              </ListSubheader>
            }
          >
            <ListItem>
              <ListItemText primary={inscricao?.status} />
            </ListItem>
          </List>

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
          <ModalProducao onSuccess={addProducao} />
        </CardContent>
      </Card>
    </Grid>
  );
}
