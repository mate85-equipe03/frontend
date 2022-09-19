import React, { useContext, useEffect, useState } from "react";
import {
  Button,
  Grid,
  Card,
  CardHeader,
  CardContent,
  Divider,
  List,
  ListSubheader,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import UserContext from "../../context/UserContext";
import EditalItem from "./Components/EditalItem";
import { IEditais } from "./Types";
import { getAllProcessosSeletivos } from "./Service";
import Loading from "../../Components/Loading";

export default function Home() {
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);
  const [editais, setEditais] = useState<IEditais | undefined>();
  const [loading, setLoading] = useState<boolean>(true);

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    navigate("/");
  };

  const redirectToLogin = () => {
    navigate("/login");
  };

  useEffect(() => {
    setLoading(true);
    getAllProcessosSeletivos()
      .then(({ data }) => {
        setEditais(data?.editais);
      })
      .catch((e) => {
        // TODO: Ver como exibir erros va View
        console.error(e);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <Grid
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
      sx={{ height: "100%" }}
    >
      {user ? (
        <Grid
          container
          direction="column"
          justifyContent="center"
          alignItems="center"
          sx={{ width: "100%" }}
        >
          <Button type="button" onClick={logout} size="large">
            Sair
          </Button>
        </Grid>
      ) : (
        <Button type="button" onClick={redirectToLogin} size="large">
          Login
        </Button>
      )}

      <Card sx={{ minWidth: { md: 500 }, maxWidth: 800, mt: 5 }}>
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
            {loading ? (
              <Loading />
            ) : (
              editais?.em_andamento?.map((edital) => (
                <EditalItem key={edital?.id} edital={edital} />
              ))
            )}
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
            {loading ? (
              <Loading />
            ) : (
              editais?.arquivados?.map((edital) => (
                <EditalItem key={edital?.id} edital={edital} />
              ))
            )}
          </List>
        </CardContent>
      </Card>
    </Grid>
  );
}
