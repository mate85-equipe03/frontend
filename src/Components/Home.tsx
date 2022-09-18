import React from "react";
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
  Alert,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

interface Props {
  user: string;
  setUser: (value: string) => void;
}

export default function Home({ user, setUser }: Props) {
  const navigate = useNavigate();

  const logout = () => {
    setUser("");
  };

  const redirectToLogin = () => {
    navigate("/login");
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
            <ListItemButton sx={{ mx:2}} divider>
              <ListItemText>
                <Grid>
                  <Typography sx={{ fontSize: 14 }}>
                    Edital PGCOMP-mm/aaaaa
                  </Typography>
                  <Grid
                    container
                    direction="row"
                    justifyContent="space-between"
                    alignItems="flex-end"
                    flex-wrap="wrap"
                  >
                    <Typography sx={{ fontSize: 10, mr: 2 }}>
                      Inscrições abertas - Até dd/mm/aaaa
                    </Typography>
                    <Typography sx={{ fontSize: 10, color: "success.main" }}>
                      Você está inscrito.
                    </Typography>
                  </Grid>
                </Grid>
              </ListItemText>
            </ListItemButton>

            <ListItemButton sx={{ mx: 2 }} divider>
              <ListItemText>
                <Typography sx={{ fontSize: 14 }}>
                  Edital PGCOMP-mm/aaaaa
                </Typography>
                <Grid container direction="row" justifyContent="space-between">
                  <Typography sx={{ fontSize: 10 }}>
                    Inscrições abertas - Até dd/mm/aaaa
                  </Typography>
                </Grid>
              </ListItemText>
            </ListItemButton>
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
            <ListItemButton sx={{ mx:2}} divider>
              <ListItemText>
                <Typography sx={{ fontSize: 14 }}>
                  Edital PGCOMP-mm/aaaaa
                </Typography>
                <Grid container direction="row" justifyContent="space-between">
                  <Typography sx={{ fontSize: 10 }}>
                    Resultados disponíves
                  </Typography>
                </Grid>
              </ListItemText>
            </ListItemButton>
          </List>
        </CardContent>
      </Card>

      {user ? (
        <Grid
          container
          direction="column"
          justifyContent="center"
          alignItems="center"
          sx={{ width: "100%" }}
        >
          <Typography variant="h3" align="center">
            Hello, {user}!
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
