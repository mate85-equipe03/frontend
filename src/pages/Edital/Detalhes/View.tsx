import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Alert,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemText,
  Snackbar,
} from "@mui/material";
import moment from "moment";
import { IDetails } from "../../../interfaces/Interfaces";
import { getDetailsProcessoSeletivo } from "../../../services/Api";
import UserContext from "../../../context/UserContext";
import Loading from "../../../components/Loading";
import PDFFile from "../../Components/PDFFile";
import DeleteInscricao from "./DeleteInscricao";

export default function EditalDetails() {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const [edital, setEdital] = useState<IDetails | undefined>();
  const [loading, setLoading] = useState<boolean>(false);
  const [inscricaoExcluida, setInscricaoExcluida] = useState(false);

  const { editalId } = useParams();

  const redirectToInscricao = () => {
    navigate(`/edital/${editalId}/inscricao`);
  };

  const redirectToResults = () => {
    navigate(`/edital/${editalId}/resultado`);
  };

  const redirectToEnrolledList = () => {
    navigate(`/edital/${editalId}/inscritos`);
  };

  useEffect(() => {
    setLoading(true);
    getDetailsProcessoSeletivo(editalId)
      .then(({ data }) => {
        setEdital(data);
      })
      .catch(() => {
        // TODO: Ver como exibir erros va View
      })
      .finally(() => {
        setLoading(false);
      });
  }, [editalId, user, inscricaoExcluida]);

  const dateToStr = (rawDate: string) => {
    const date = moment(rawDate);
    return date.format("DD/MM/YYYY");
  };

  return loading ? (
    <Loading />
  ) : (
    <Grid>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={inscricaoExcluida}
        autoHideDuration={6000}
      >
        <Alert severity="success" sx={{ width: "100%" }}>
          Inscrição excluída com sucesso!
        </Alert>
      </Snackbar>

      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
        sx={{ width: "100%" }}
      >
        <Card sx={{ minWidth: { md: 600 }, maxWidth: 800, mt: 5, p: 4 }}>
          <CardHeader
            title={edital?.titulo}
            titleTypographyProps={{
              align: "center",
              variant: "h4",
              p: 1,
            }}
            sx={{ px: 3 }}
            subheader={edital?.descricao}
            subheaderTypographyProps={{
              align: "center",
            }}
          />
          <Divider sx={{ mx: 3 }} />

          <CardContent sx={{ px: { xs: 5, sm: 10 } }}>
            <Grid
              container
              direction="column"
              justifyContent="center"
              alignItems="center"
              sx={{ width: "auto" }}
            >
              <List>
                {edital?.etapas.map((etapa) => (
                  <ListItem disablePadding key={etapa.id}>
                    <ListItemText
                      primary={`${etapa.name}: ${dateToStr(
                        etapa.data_inicio
                      )} a 
                          ${dateToStr(etapa.data_fim)}`}
                    />
                  </ListItem>
                ))}
              </List>
              {edital && (
                <PDFFile
                  pdfUrl={edital?.edital_url}
                  pdfTitle={`${edital?.titulo}.pdf`}
                  sx={{ my: 1 }}
                />
              )}
              <Grid
                container
                direction="column"
                justifyContent="center"
                alignItems="center"
                sx={{ width: "100%", mt: 2 }}
              >
                {user?.role === "PROFESSOR" ? (
                  <Button
                    type="button"
                    onClick={redirectToEnrolledList}
                    size="large"
                  >
                    Alunos Inscritos
                  </Button>
                ) : (
                  <Grid>
                    {edital?.arquivado ? (
                      <Grid container direction="column">
                        <Button
                          type="button"
                          onClick={redirectToResults}
                          size="large"
                          sx={{ mt: 2 }}
                        >
                          Resultados Disponíveis
                        </Button>
                        {edital?.isInscrito && (
                          <Button
                            type="button"
                            color="inherit"
                            onClick={redirectToInscricao}
                            size="large"
                            sx={{ mt: 1 }}
                          >
                            Ver Minha Inscrição
                          </Button>
                        )}
                      </Grid>
                    ) : (
                      <Grid>
                        {edital?.isInscrito ? (
                          <Grid
                            container
                            justifyContent="space-between"
                            sx={{ width: "100%", pt: 2 }}
                          >
                            <DeleteInscricao
                              idInscricao={edital.idInscricao}
                              onSuccess={() => setInscricaoExcluida(true)}
                            />

                            <Button
                              type="button"
                              onClick={redirectToInscricao}
                              size="large"
                              sx={{ width: "192px", ml: 2 }}
                            >
                              Editar Inscrição
                            </Button>
                          </Grid>
                        ) : (
                          <Button
                            type="button"
                            onClick={redirectToInscricao}
                            size="large"
                          >
                            Inscreva-se
                          </Button>
                        )}
                      </Grid>
                    )}
                  </Grid>
                )}
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}
