import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Button,
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
  Tooltip,
  Typography,
} from "@mui/material";
import UserContext from "../../context/UserContext";
import { ADetalhes } from "./Interfaces";
import Loading from "../../Components/Loading";
import getDetalhesInscricaoAluno from "./Service";
import getDetailsProcessoSeletivo from "../Edital/Detalhes/Service";
import { IDetails } from "../Edital/Detalhes/Interfaces";

export default function RevisarInscricaoAluno() {
  const { user } = useContext(UserContext);
  const [inscricao, setInscricao] = useState<ADetalhes | undefined>();
  const [edital, setEdital] = useState<IDetails | undefined>();
  const [loading, setLoading] = useState<boolean>(true);
  const { editalId, inscricaoId } = useParams();

  useEffect(() => {
    setLoading(true);
    if (user) {
      getDetalhesInscricaoAluno(editalId, user?.token)
        .then(({ data }) => {
          setInscricao(data);
        })
        .catch(() => {
          // TODO: Ver como exibir erros va View
        })
        .finally(() => {
          setLoading(false);
        });
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
          <Tooltip title="Status da Inscrição" arrow placement="top">
            <Typography
              color="primary"
              sx={{
                paddingLeft: 0.4,
                width: 80,
                border: "solid",
                borderRadius: 1,
                fontWeight: "bold",
              }}
            >
              {inscricao?.status}
            </Typography>
          </Tooltip>
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
                    <ListItemText primary={`${historico.tipo}`} />
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
          <Button type="button" size="large">
            Adicionar Produção Científica
          </Button>
        </CardContent>
      </Card>
    </Grid>
  );
}
