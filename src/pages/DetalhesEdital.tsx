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
import { IEdital, IEtapa } from "../interfaces/Interfaces";
import {
  getDetailsProcessoSeletivo,
  getEtapaAtualProcessoSeletivo,
} from "../services/Api";
import UserContext from "../context/UserContext";
import Loading from "../components/Loading";
import PDFFile from "../components/PDFFile";
import DeleteInscricao from "../components/Inscricao/DeleteInscricao";
import auth from "../services/Auth";
import Inscrito from "../components/Inscrito";
import { EtapasEnum } from "../enums/Enums";
import editalService from "../services/Edital";

export default function EditalDetails() {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const [edital, setEdital] = useState<IEdital | null>(null);
  const [loadingEdital, setLoadingEdital] = useState<boolean>(false);
  const [loadingEtapaAtual, setLoadingEtapaAtual] = useState<boolean>(false);
  const [etapaAtual, setEtapaAtual] = useState<IEtapa | null>(null);
  const [nomeDaEtapaAtual, setNomeDaEtapaAtual] = useState<string>();
  const [inscricaoExcluida, setInscricaoExcluida] = useState<boolean>(false);
  const [buttons, setButtons] = useState<JSX.Element | null>();

  const { editalId } = useParams();

  useEffect(() => {
    if (Number(editalId)) {
      setLoadingEdital(true);
      setLoadingEtapaAtual(true);
      getDetailsProcessoSeletivo(Number(editalId))
        .then(({ data }) => {
          setEdital(data);
        })
        .catch()
        .finally(() => {
          setLoadingEdital(false);
        });
      getEtapaAtualProcessoSeletivo(Number(editalId))
        .then(({ data }) => {
          setEtapaAtual(data);
        })
        .catch()
        .finally(() => {
          setLoadingEtapaAtual(false);
        });
    }
  }, [editalId, user, inscricaoExcluida]);

  const dateToStr = (rawDate: string) => {
    const date = moment(rawDate);
    return date.format("DD/MM/YYYY");
  };

  useEffect(() => {
    const redirectToInscricao = () => {
      navigate(`/edital/${editalId}/inscricao`);
    };

    const redirectToEnrolledList = () => {
      navigate(`/edital/${editalId}/inscritos`);
    };

    const redirectToResults = () => {
      navigate(`/edital/${editalId}/resultado`);
    };

    const buttonsEnum = {
      ALUNOS_INSCRITOS: (
        <Button
          type="button"
          onClick={redirectToEnrolledList}
          size="large"
          sx={{ mx: 1 }}
        >
          Alunos Inscritos
        </Button>
      ),

      VISUALIZAR_INSCRICAO: (
        <Button
          type="button"
          onClick={redirectToInscricao}
          size="large"
          sx={{ mx: 1 }}
        >
          Ver Inscrição
        </Button>
      ),

      EDIT_DELETE_INSCRICAO: edital ? (
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
            sx={{ width: "192px", mx: 1 }}
          >
            Editar Inscrição
          </Button>
        </Grid>
      ) : null,

      INSCREVA_SE: (
        <Button
          type="button"
          onClick={redirectToInscricao}
          size="large"
          sx={{ mx: 1 }}
        >
          Inscreva-se
        </Button>
      ),

      RESULTADOS_DISPONIVEIS: (
        <Button
          type="button"
          onClick={redirectToResults}
          size="large"
          sx={{ mx: 1 }}
        >
          Ver Resultados
        </Button>
      ),
    };

    const buttonsStudentInscricoesAbertas = (): JSX.Element | null => {
      if (edital?.isInscrito) {
        return buttonsEnum.EDIT_DELETE_INSCRICAO;
      }
      return buttonsEnum.INSCREVA_SE;
    };

    const buttonsStudentInscricoesFechadas = (): JSX.Element | null => {
      if (edital?.isInscrito) {
        return buttonsEnum.VISUALIZAR_INSCRICAO;
      }
      return null;
    };

    const buttonsResultadosDisponiveis = (): JSX.Element | null => {
      if (auth.isTeacher()) {
        return buttonsEnum.ALUNOS_INSCRITOS;
      }
      if (auth.isStudent()) {
        return buttonsStudentInscricoesFechadas();
      }
      return null;
    };

    const getButtonsInscricoesAbertas = (): JSX.Element | null => {
      if (auth.isTeacher()) {
        return buttonsEnum.ALUNOS_INSCRITOS;
      }
      if (auth.isStudent()) {
        return buttonsStudentInscricoesAbertas();
      }
      if (!auth.isLoggedIn()) {
        return buttonsEnum.INSCREVA_SE;
      }
      return null;
    };

    const getButtonsAnaliseInscricoes = (): JSX.Element | null => {
      if (auth.isTeacher()) {
        return buttonsEnum.ALUNOS_INSCRITOS;
      }
      return null;
    };

    const getButtonsResultadosDisponiveis = (): JSX.Element | null => {
      return (
        <Grid container justifyContent="center" sx={{ width: "100%", pt: 2 }}>
          {buttonsResultadosDisponiveis()}
          {buttonsEnum.RESULTADOS_DISPONIVEIS}
        </Grid>
      );
    };

    if (etapaAtual !== null && edital !== null) {
      const etapa = editalService.etapaAtual(etapaAtual, edital);
      setNomeDaEtapaAtual(editalService.nomeDaEtapa(etapa));
      switch (etapa) {
        case EtapasEnum.INSCRICOES_ABERTAS:
          setButtons(getButtonsInscricoesAbertas());
          break;
        case EtapasEnum.ANALISE_DE_INSCRICOES:
          setButtons(getButtonsAnaliseInscricoes());
          break;
        case EtapasEnum.RESULTADO_FINAL:
          setButtons(getButtonsResultadosDisponiveis());
          break;
        default: {
          setButtons(null);
          break;
        }
      }
    }
  }, [etapaAtual, edital, editalId, navigate]);

  return loadingEdital || loadingEtapaAtual ? (
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
              {auth.isStudent() && edital && (
                <Grid
                  container
                  direction="column"
                  justifyContent="center"
                  alignItems="center"
                  sx={{ width: "auto", mt: 2, mb: 1 }}
                >
                  <Inscrito isInscrito={edital.isInscrito} />
                </Grid>
              )}

              <Grid
                container
                direction="column"
                justifyContent="center"
                alignItems="center"
                sx={{ width: "auto", my: 3 }}
              >
                <Typography variant="h6">Etapas</Typography>
                <List>
                  {edital?.etapas.map((etapa, index) => {
                    const dataInicio = dateToStr(etapa.data_inicio);
                    const dataFim = dateToStr(etapa.data_fim);
                    const nomeDaEtapa = editalService.nomeDaEtapaRaw(
                      etapa,
                      edital
                    );
                    const isResultadoFinal = editalService.isResultadoFinal(
                      etapa,
                      edital
                    );

                    return (
                      <ListItem disablePadding key={etapa.id}>
                        <ListItemText>
                          <Grid container direction="row">
                            <Typography sx={{ fontWeight: "bold" }}>
                              {index + 1}. {nomeDaEtapa}
                              :&nbsp;
                            </Typography>
                            <Typography>
                              {!isResultadoFinal
                                ? `${dataInicio} a ${dataFim}`
                                : `A partir de ${dataInicio}`}
                            </Typography>
                          </Grid>
                        </ListItemText>
                      </ListItem>
                    );
                  })}
                </List>

                {nomeDaEtapaAtual && (
                  <Alert sx={{ mt: 2 }} severity="info">
                    Etapa atual: {nomeDaEtapaAtual}
                  </Alert>
                )}
              </Grid>

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
                {buttons}
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}
