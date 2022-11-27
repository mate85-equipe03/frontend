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
import { IDetails } from "../interfaces/Interfaces";
import { getDetailsProcessoSeletivo } from "../services/Api";
import UserContext from "../context/UserContext";
import Loading from "../components/Loading";
import PDFFile from "../components/PDFFile";
import DeleteInscricao from "../components/Inscricao/DeleteInscricao";
import auth from "../services/Auth";

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

  const redirectToEnrolledList = () => {
    navigate(`/edital/${editalId}/inscritos`);
  };

  const redirectToResults = () => {
    navigate(`/edital/${editalId}/resultado`);
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

  const BUTTONS_ENUM = {
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
      return BUTTONS_ENUM.EDIT_DELETE_INSCRICAO;
    }
    return BUTTONS_ENUM.INSCREVA_SE;
  };

  const buttonsStudentInscricoesFechadas = (): JSX.Element | null => {
    if (edital?.isInscrito) {
      return BUTTONS_ENUM.VISUALIZAR_INSCRICAO;
    }
    return null;
  };

  const buttonsResultadosDisponiveis = (): JSX.Element | null => {
    if (auth.isTeacher()) {
      return BUTTONS_ENUM.ALUNOS_INSCRITOS;
    }
    if (auth.isStudent()) {
      return buttonsStudentInscricoesFechadas();
    }
    return null;
  };

  const getButtonsInscricoesAbertas = (): JSX.Element | null => {
    if (auth.isStudent()) {
      return buttonsStudentInscricoesAbertas();
    }
    if (!auth.isLoggedIn()) {
      return BUTTONS_ENUM.INSCREVA_SE;
    }
    return null;
  };

  const getButtonsAnaliseInscricoes = (): JSX.Element | null => {
    if (auth.isTeacher()) {
      return BUTTONS_ENUM.ALUNOS_INSCRITOS;
    }
    return null;
  };

  const getButtonsResultadosDisponiveis = (): JSX.Element | null => {
    return (
      <Grid container justifyContent="center" sx={{ width: "100%", pt: 2 }}>
        {buttonsResultadosDisponiveis()}
        {BUTTONS_ENUM.RESULTADOS_DISPONIVEIS}
      </Grid>
    );
  };

  const getButtons = (): JSX.Element | null => {
    // TODO: Implementar lógica das etapas (POSG-138)
    let etapa = 2;
    etapa = 1;
    etapa = 0;

    switch (etapa) {
      case 0: // "inscrições abertas"
        return getButtonsInscricoesAbertas();
      case 1: // "análise de inscrições"
        return getButtonsAnaliseInscricoes();
      case 2: // "resultados disponíveis"
        return getButtonsResultadosDisponiveis();
      default: {
        return null;
      }
    }
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
                {getButtons()}
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}
