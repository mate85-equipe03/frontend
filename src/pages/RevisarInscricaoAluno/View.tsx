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
  Typography,
} from "@mui/material";
import UserContext from "../../context/UserContext";
import { ADetalhes } from "./Interfaces";
import Loading from "../../Components/Loading";
import getDetalhesInscricaoAluno from "./Service";

export default function RevisarInscricaoAluno() {
  const { user } = useContext(UserContext);
  const [inscricao, setInscricao] = useState<ADetalhes | undefined>();
  const [loading, setLoading] = useState<boolean>(true);
  const { editalId, inscricaoId} = useParams();

  useEffect(() => {
    setLoading(true);
    if(user){
      getDetalhesInscricaoAluno( editalId, user?.token)
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
            title="Revisar Inscrição"
            titleTypographyProps={{
              align: "center",
              variant: "h4",
              p: 1,
            }}
            sx={{ px: 3 }}
            subheader="Dados enviados na inscrição"
            subheaderTypographyProps={{
              align: "center",
            }}
          />
          <Divider sx={{ mx: 3 }} />

          <CardContent sx={{ px: { xs: 5, sm: 10 } }}>
            {loading ? (
              <Loading />
            ) : (
              <Grid
                container
                direction="column"
                justifyContent="center"
                alignItems="center"
                sx={{ width: "100%" }}
              >
                <Card sx={{ minWidth: { md: 500 }, maxWidth: 800, mt: 3, border: "none", marginBottom: 5 }}>
                  <CardHeader
                    title="Históricos"
                    titleTypographyProps={{
                      align: "center",
                      variant: "h6",
                      p: 1,
                    }}
                  />
                  <Divider sx={{ mx: 3 }} />
                  <CardContent sx={{ px: { xs: 5, sm: 10 } }}>
                      <List>
                        {inscricao?.Historico.map((historico) => (
                          <ListItem disablePadding key={historico.id}>
                            <ListItemButton href={historico.url}>
                              <ListItemText
                                primary={`${historico.tipo}`}
                              />
                            </ListItemButton>
                          </ListItem>
                        ))}
                      </List>
                  </CardContent>
                </Card>
                <Card sx={{ minWidth: { md: 500 }, maxWidth: 800, mt: 3, border: "none", marginBottom: 5 }}>
                  <CardHeader
                    title="Produções Científicas"
                    titleTypographyProps={{
                      align: "center",
                      variant: "h6",
                      p: 1,
                    }}
                  />
                  <Divider sx={{ mx: 3 }} />
                  <CardContent sx={{ px: { xs: 5, sm: 10 } }}>
                      <List>
                        {inscricao?.producoes.map((producao) => (
                          <ListItem disablePadding key={producao.id}>
                            <ListItemButton href={producao.url}>
                              <ListItemText
                                primary={`${producao.categorias_producao_id}`}
                              />
                            </ListItemButton>
                          </ListItem>
                        ))}
                      </List>
                  </CardContent>
                </Card>
                <Button
                      type="button"
                      size="large"
                      
                >
                  Adicionar Produção Científica
                </Button>
              </Grid>
            )}
          </CardContent>
        </Card>
      </Grid>
  );
}
