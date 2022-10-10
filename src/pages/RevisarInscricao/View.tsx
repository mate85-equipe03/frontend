import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
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
  ListItemButton,
  ListItemText,
  ListSubheader,
  Typography,
} from "@mui/material";
import UserContext from "../../context/UserContext";
import { ADetalhes } from "./Interfaces";
import Loading from "../../Components/Loading";
import getDetalhesInscricaoProfessor from "./Service";
import getDetailsProcessoSeletivo from "../Edital/Detalhes/Service";
import { IDetails } from "../Edital/Detalhes/Interfaces";

export default function RevisarInscricao() {
  const { user } = useContext(UserContext);
  const [inscricao, setInscricao] = useState<ADetalhes | undefined>();
  const [edital, setEdital] = useState<IDetails | undefined>();
  const [loading, setLoading] = useState<boolean>(true);
  const { editalId, inscricaoId} = useParams();

  function requestEdital(){
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
  }

  function requestInscricoes(){
    getDetalhesInscricaoProfessor(inscricaoId, editalId, user?.token)
      .then(({ data }) => {
        setInscricao(data);
      })
      .catch(() => {
        // TODO: Ver como exibir erros va View
      })
      .finally(() => {
         setLoading(false);
      });
  }

  useEffect(() => {
    setLoading(true);
    if(user){
      requestEdital();
      requestInscricoes();
    }
  }, [inscricaoId, editalId, user]);

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
            subheader="Revisão de dados enviados na inscrição"
            subheaderTypographyProps={{
              align: "center",
            }}
          />
          <Divider sx={{ mx: 3 }} />

          <CardContent sx={{ px: { xs: 5, sm: 10 } }}>
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
                      Dados do Inscrito
                    </ListSubheader>
                  }
              >
                {loading ? (
                    <Loading />
                  ) : (
                    <div>
                      <ListItem sx={{paddingBottom: 0}}>
                          <ListItemText primary={`${inscricao?.aluno.nome}`}/>
                      </ListItem>
                      <ListItem sx={{paddingBottom: 0}}>
                          <ListItemText primary={`${inscricao?.aluno.curso}`}/>
                      </ListItem>
                      <ListItem sx={{paddingBottom: 0}}>
                          <ListItemText primary={`Matrícula: ${inscricao?.aluno.matricula}`}/>
                      </ListItem>
                      <ListItem sx={{paddingBottom: 0}}>
                          <ListItemText primary={`Ingresso: ${inscricao?.aluno.semestre_pgcomp}`}/>
                      </ListItem>
                      <ListItem sx={{paddingBottom: 0}}>
                          <Link href={inscricao?.aluno.lattes_link} target="blank"> Currículo Lattes</Link>
                      </ListItem>
                    </div>
                )}
              </List>
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
                  {loading ? (
                    <Loading />
                  ) : ( 
                    inscricao?.Historico?.map((historico) => (
                      <ListItem disablePadding key={historico.id}>
                        <ListItemButton href={historico.url}>
                          <ListItemText
                            primary={`${historico.tipo}`}
                          />
                        </ListItemButton>
                      </ListItem>
                  ))
                  )}
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
                  {loading ? (
                    <Loading />
                  ) : ( 
                    inscricao?.producoes.map((producao) => (
                        <ListItem disablePadding key={producao.id}>
                          <ListItemButton href={producao.url}>
                            <ListItemText
                              primary={`${producao.categorias_producao_id}`}
                            />
                          </ListItemButton>
                        </ListItem>
                      ))
                  )}
                </List>       
          </CardContent>
        </Card>
      </Grid>
  );
}
