import React, { useContext } from "react";
import {
  Button,
  Grid,
  Typography,
  Card,
  CardHeader,
  CardContent,
  Divider,
  List,
  ListSubheader,
  ListItemText,
  ListItemButton,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import UserContext from "../context/UserContext";

export default function Home() {
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  const redirectToLogin = () => {
    navigate("/login");
  };

  // Mockup *Temporário*
  const editais = {
    em_andamento: [
      {
        id: 1,
        nome: "Edital PGCOMP-09/2022",
        etapa: { nome: "Inscrições Abertas", data_fim: "dd/mm/aaaa" },
        inscrito: true,
      },
      {
        id: 2,
        nome: "Edital PGCOMP-07/2022",
        etapa: {
          nome: "Análise de inscrições",
          data_fim: "dd/mm/aaaa",
        },
        inscrito: false,
      },
    ],
    encerrados: [
      {
        id: 1,
        nome: "Edital PGCOMP-03/2022",
      },
    ],
  };


  return (
    <Grid
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
      sx={{ height: "100%" }}
    >
      <Card sx={{ minWidth: { md: 500 }, maxWidth: 800 }}>
        <CardHeader
          title="Processos Seletivos"
          titleTypographyProps={{
            align: "center",
            variant: "h4",
            p: 1,
          }}
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
            {editais.em_andamento.map((edital) => (
              <ListItemButton key={edital.id} sx={{ mx: 2 }} divider>
                <ListItemText>
                  <Grid
                    container
                    direction="row"
                    justifyContent="space-between"
                  >
                    <Typography sx={{ fontSize: 14 }}>{edital.nome}</Typography>
                    {edital.inscrito && (
                      <Typography sx={{ fontSize: 10, color: "primary.main" }}>
                        Você está inscrito
                      </Typography>
                    )}
                  </Grid>
                  <Typography sx={{ fontSize: 10, mr: 2 }}>
                    {edital.etapa.nome} - Até {edital.etapa.data_fim}
                  </Typography>
                </ListItemText>
              </ListItemButton>
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
            {editais.encerrados.map((edital) => (
              <ListItemButton key={edital.id} sx={{ mx: 2 }} divider>
                <ListItemText>
                  <Typography sx={{ fontSize: 14 }}>{edital.nome}</Typography>
                  <Grid
                    container
                    direction="row"
                    justifyContent="space-between"
                  >
                    <Typography sx={{ fontSize: 10 }}>
                      Resultados disponíves
                    </Typography>
                  </Grid>
                </ListItemText>
              </ListItemButton>
            ))}
          </List>
        </CardContent>
      </Card>
      &nbsp;
      {user ? (
        <Grid
          container
          direction="column"
          justifyContent="center"
          alignItems="center"
          sx={{ width: "100%" }}
        >
          <Typography variant="h3" align="center">
            Hello, {user?.username}!
          </Typography>
          <Button type="button" onClick={logout} size="large">
            Sair
          </Button>
        </Grid>
      ) : (
        <Button type="button" onClick={redirectToLogin} size="large">
          Login
        </Button>
      )}
    </Grid>
  );
}
