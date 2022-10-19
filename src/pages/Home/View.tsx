import React, { useEffect, useState } from "react";
import {
  Grid,
  Card,
  CardHeader,
  CardContent,
  Divider,
  List,
  ListSubheader,
  Alert,
} from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import EditalItem from "./Components/EditalItem";
import { IEditais } from "./Types";
import getAllProcessosSeletivos from "./Service";
import Loading from "../../Components/Loading";

export default function Home() {
  const navigate = useNavigate();
  const location = useLocation();
  const signOutSuccess = location.state ? "signOut" in location.state : false;
  const signInSuccess = location.state ? "signIn" in location.state : false;
  window.history.replaceState(null, "");


  const [editais, setEditais] = useState<IEditais | undefined>();
  const [loading, setLoading] = useState<boolean>(true);

  const redirectToDetails = (editalId: number) => {
    navigate(`/edital/${editalId}/detalhes`);
  };

  useEffect(() => {
    setLoading(true);
    getAllProcessosSeletivos()
      .then(({ data }) => {
        setEditais(data?.editais);
      })
      .catch(() => {
        // TODO: Ver como exibir erros va View
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return loading ? (
    <Loading />
  ) : (
    <Grid
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
      sx={{ height: "100%" }}
    >
      {signOutSuccess && (
        <Alert severity="success" sx={{ mb: 2 }}>
          Você está deslogado.
        </Alert>
      )}
      {signInSuccess && (
        <Alert severity="success" sx={{ mb: 2 }}>
          Você está logado.
        </Alert>
      )}
      <Card sx={{ minWidth: { md: 500 }, maxWidth: 800 }}>
        <CardHeader
          title="Processos Seletivos"
          titleTypographyProps={{
            align: "center",
            variant: "h4",
            p: 1,
          }}
          sx={{ px: 3 }}
          subheader="Concessão de Bolsas de Mestrado e Doutorado"
          subheaderTypographyProps={{
            align: "center",
          }}
        />
        <Divider sx={{ mx: 3 }} />
        <CardContent sx={{ px: 4 }}>
          <List
            component="nav"
            aria-labelledby="editais-em-andamento"
            subheader={
              <ListSubheader
                id="editais-em-andamento"
                color="primary"
                sx={{
                  fontSize: 20,
                }}
              >
                Em andamento
              </ListSubheader>
            }
          >
            {/* 
            TODO: Exibir componente padrão em caso de array vazio
            */}
            {editais?.em_andamento?.map((edital) => (
              <EditalItem
                key={edital?.id}
                edital={edital}
                onClick={() => redirectToDetails(edital.id)}
              />
            ))}
          </List>

          <List
            component="nav"
            aria-labelledby="editais-encerrados"
            subheader={
              <ListSubheader
                id="editais-encerrados"
                color="primary"
                sx={{ fontSize: 20 }}
              >
                Encerrados
              </ListSubheader>
            }
          >
            {/* 
            TODO: Exibir componente padrão em caso de array vazio
            */}
            {editais?.arquivados?.map((edital) => (
              <EditalItem
                key={edital?.id}
                edital={edital}
                onClick={() => redirectToDetails(edital.id)}
              />
            ))}
          </List>
        </CardContent>
      </Card>
    </Grid>
  );
}
