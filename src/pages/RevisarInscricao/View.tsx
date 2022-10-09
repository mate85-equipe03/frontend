import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
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
import moment from "moment";
import UserContext from "../../context/UserContext";
import { ADetalhes } from "./Interfaces";
import getDetalhesAluno from "./Service";
import Loading from "../../Components/Loading";

export default function RevisarInscricao() {
  const { user } = useContext(UserContext);
  const [inscricao, setInscricao] = useState<ADetalhes | undefined>();
  const [loading, setLoading] = useState<boolean>(true);
  const { editalId, inscricaoId} = useParams();


  useEffect(() => {
    setLoading(true);
    if(user){
      getDetalhesAluno(inscricaoId, editalId, user?.token)
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
            title={inscricao?.aluno.nome}
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
                <Typography color="primary" fontWeight="bold">
                  {`Matrícula: ${inscricao?.aluno.matricula}`}
                </Typography>
                <Typography color="primary" fontWeight="bold">
                  {`Curso: ${inscricao?.aluno.curso}`}
                </Typography>
                <Typography color="primary" fontWeight="bold">
                  {`Semestre de Ingresso: ${inscricao?.aluno.semestre_pgcomp}`}
                </Typography>
                <Typography>
                  <Link
                    href={inscricao?.aluno.lattes_link}
                    underline="none"
                    target="_blank"
                    sx={{ my: 1 }}
                  >
                    Currículo Lattes
                  </Link>
                </Typography>
                <Card sx={{ minWidth: { md: 500 }, maxWidth: 800, mt: 3, border: "none" }}>
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
              </Grid>
            )}
          </CardContent>
        </Card>
      </Grid>
  );
}
