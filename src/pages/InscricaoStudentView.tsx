import {
  Grid,
  Alert,
  Card,
  CardHeader,
  Divider,
  CardContent,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "../components/Loading";
import UserContext from "../context/UserContext";
import {
  getDadosAluno,
  getDetailsProcessoSeletivo,
  getEtapaAtualProcessoSeletivo,
} from "../services/Api";
import { IDados, IEdital, IEtapa } from "../interfaces/Interfaces";
import DadosCandidato from "../components/DadosCandidato";
import EditarInscricao from "../components/Inscricao/EditarInscricao";
import NovaInscricao from "../components/Inscricao/NovaInscricao";
import editalService from "../services/Edital";
import { EtapasEnum } from "../enums/Enums";

export default function InscricaoStudentView() {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const [loadingDadosAluno, setLoadingDadosAluno] = useState<boolean>(false);
  const [loadingEtapaAtual, setLoadingEtapaAtual] = useState<boolean>(false);
  const [loadingProcessoSeletivo, setLoadingProcessoSeletivo] =
    useState<boolean>(false);
  const [inscricaoError, setInscricaoError] = React.useState<boolean>(false);
  const [edital, setEdital] = useState<IEdital | null>(null);
  const [dadosAluno, setDadosAluno] = useState<IDados | undefined>();
  const [etapaAtual, setEtapaAtual] = useState<IEtapa | null>(null);
  const [inscricaoId, setInscricaoId] = useState<number>();
  const [readOnly, setReadOnly] = useState<boolean>(false);

  const params = useParams();
  const editalId = Number(params.editalId) ? Number(params.editalId) : null;

  useEffect(() => {
    const redirectToDetails = () => {
      navigate(`/edital/${editalId}/detalhes`);
    };
    if (user && editalId) {
      setLoadingDadosAluno(true);
      setLoadingEtapaAtual(true);
      setLoadingProcessoSeletivo(true);
      getDadosAluno()
        .then(({ data }) => {
          setDadosAluno(data);
        })
        .catch()
        .finally(() => {
          setLoadingDadosAluno(false);
        });
      getDetailsProcessoSeletivo(editalId)
        .then(({ data }) => {
          setEdital(data);
          setInscricaoId(data?.idInscricao);
        })
        .catch()
        .finally(() => {
          setLoadingProcessoSeletivo(false);
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
  }, [editalId, navigate, user]);

  useEffect(() => {
    const redirectToDetails = () => {
      navigate(`/edital/${editalId}/detalhes`);
    };
    const etapasValidas = [
      EtapasEnum.INSCRICOES_ABERTAS,
      EtapasEnum.RESULTADO_FINAL,
    ];

    if (etapaAtual !== null && edital !== null) {
      const isEtapaValida = editalService.isEtapaValida(
        etapaAtual,
        edital,
        etapasValidas
      );

      const isResultadoFinal = editalService.isResultadoFinal(
        etapaAtual,
        edital
      );

      if (!isEtapaValida) {
        redirectToDetails();
      }

      if (isResultadoFinal) {
        if (inscricaoId) {
          setReadOnly(true);
        } else {
          redirectToDetails();
        }
      }
    }
  }, [etapaAtual, edital, editalId, navigate]);

  return loadingDadosAluno || loadingEtapaAtual || loadingProcessoSeletivo ? (
    <Loading />
  ) : (
    <Grid
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
      sx={{ height: "100%" }}
    >
      {inscricaoError && (
        <Alert severity="error">Ocorreu um erro. Tente novamente.</Alert>
      )}
      <Card sx={{ width: 800, mt: 5 }}>
        <CardHeader
          title="Inscrição em Processo Seletivo"
          titleTypographyProps={{
            align: "center",
            variant: "h4",
            p: 1,
          }}
          sx={{ px: 3 }}
          subheader={edital?.titulo}
          subheaderTypographyProps={{
            align: "center",
          }}
        />
        <Divider sx={{ mx: 3 }} />

        <CardContent sx={{ px: { xs: 5, sm: 10 } }}>
          <DadosCandidato dadosInscrito={dadosAluno?.aluno} />
          {editalId &&
            (!inscricaoId ? (
              <NovaInscricao
                editalId={editalId}
                setInscricaoError={setInscricaoError}
              />
            ) : (
              <EditarInscricao
                editalId={editalId}
                inscricaoId={inscricaoId}
                readOnly={readOnly}
                setInscricaoError={setInscricaoError}
              />
            ))}
        </CardContent>
      </Card>
    </Grid>
  );
}
