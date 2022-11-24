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
  Typography,
} from "@mui/material";
import moment from "moment";
import { IDetails } from "./Interfaces";
import { getDetailsProcessoSeletivo } from "./Service";
import UserContext from "../../../context/UserContext";
import Loading from "../../../Components/Loading";
import PDFFile from "../../Components/PDFFile";
import DeleteInscricao from "./DeleteInscricao";

export default function EditalDetails() {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const [edital, setEdital] = useState<IDetails | undefined>();
  const [loading, setLoading] = useState<boolean>(false);
  const [inscricaoCancelada, setInscricaoCancelada] = useState(false);

  const { editalId } = useParams();

  const redirectToSubscribe = () => {
    navigate(`/edital/${editalId}/inscricao`);
  };

  const redirectToEditarInscricao = () => {
    navigate(`/edital/${editalId}/inscricao`);
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
  }, [editalId, user, inscricaoCancelada]);

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
        open={inscricaoCancelada}
        autoHideDuration={6000}
      >
        <Alert severity="success" sx={{ width: "100%" }}>
          Inscrição cancelada com sucesso!
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
                      <Typography sx={{ fontSize: 20, color: "primary.main" }}>
                        Resultados disponíveis {/* link para resultado */}
                      </Typography>
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
                              onSuccess={() => setInscricaoCancelada(true)}
                            />

                            <Button
                              type="button"
                              onClick={redirectToEditarInscricao}
                              size="large"
                              sx={{ width: "192px", ml: 2 }}
                            >
                              Editar Inscrição
                            </Button>
                          </Grid>
                        ) : (
                          <Button
                            type="button"
                            onClick={redirectToSubscribe}
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
