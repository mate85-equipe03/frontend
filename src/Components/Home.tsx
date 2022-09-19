import React, { useContext } from "react";
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
import UserContext from "../context/UserContext";
import EditalItem from "./EditalItem";

interface IEtapa {
  nome: string;
  data_fim: string;
}

interface IEditalAberto {
  id: number;
  nome: string;
  etapa: IEtapa;
  inscrito?: boolean;
}

interface IEditalEncerrado {
  id: number;
  nome: string;
  inscrito?: boolean;
}

interface IEditais {
  em_andamento: IEditalAberto[];
  encerrados: IEditalEncerrado[];
}

export default function Home() {
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    navigate("/");
  };

  const redirectToLogin = () => {
    navigate("/login");
  };

  // Mockup *Temporário*
  const editais: IEditais = {
    em_andamento: [
      {
        id: 1,
        nome: "Edital PGCOMP-03/2022",
        etapa: { nome: "Inscrições abertas", data_fim: "15/10/2021" },
      },
    ],
    encerrados: [
      {
        id: 1,
        nome: "Edital PGCOMP-09/2022",
      },
    ],
  };

  if (user) {
    editais.em_andamento = editais.em_andamento.map((edital) => {
      return { ...edital, inscrito: true };
    });
    editais.encerrados = editais.encerrados.map((edital) => {
      return { ...edital, inscrito: true };
    });
  }

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
            {editais?.em_andamento?.map((edital) => (
              <EditalItem key={edital?.id} edital={edital} />
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
            {editais?.encerrados?.map((edital) => (
              <EditalItem key={edital?.id} edital={edital} />
            ))}
          </List>
        </CardContent>
      </Card>
    </Grid>
  );
}

export type { IEditalAberto, IEditalEncerrado };
