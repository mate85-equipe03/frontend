import {
  Grid,
  Alert,
  Card,
  CardHeader,
  Divider,
  CardContent,
  Typography,
  List,
  ListItem,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import Loading from "../components/Loading";
import UserContext from "../context/UserContext";
import DadosCandidato from "../components/DadosCandidato";
import { IDetalhesInscricao, IEdital, IEtapa } from "../interfaces/Interfaces";
import RevisarAuditarInscricao from "../components/Inscricao/RevisarAuditarInscricao";
import {
  getDetalhesInscricaoProfessor,
  getDetailsProcessoSeletivo,
  getEtapaAtualProcessoSeletivo,
} from "../services/Api";
import { EtapasEnum } from "../enums/Enums";
import editalService from "../services/Edital";

export default function InscricaoTeacherView() {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const [loadingDadosAluno, setLoadingDadosAluno] = useState<boolean>(false);
  const [loadingEtapaAtual, setLoadingEtapaAtual] = useState<boolean>(false);
  const [loadingProcessoSeletivo, setLoadingProcessoSeletivo] =
    useState<boolean>(false);
  const [inscricaoError, setInscricaoError] = React.useState<boolean>(false);
  const [edital, setEdital] = useState<IEdital | null>(null);
  const [dadosInscricao, setDadosInscricao] = useState<IDetalhesInscricao>();
  const [isAuditoria, setIsAuditoria] = React.useState<boolean>(false);
  const [readOnly, setReadOnly] = React.useState<boolean>(false);
  const [warningMessage, setWarningMessage] = React.useState<string>();
  const [isAnaliseDeInscricoes, setIsAnaliseDeInscricoes] =
    React.useState<boolean>(false);

  const params = useParams();
  const editalId = Number(params.editalId) ? Number(params.editalId) : null;
  const inscricaoId = Number(params.inscricaoId)
    ? Number(params.inscricaoId)
    : null;
  const [revisorName, setRevisorName] = useState<string>();
  const [auditorName, setAuditorName] = useState<string>();

  useEffect(() => {
    const isRevisadaEAuditada = (revisorId: number, auditorId: number) => {
      if (revisorId && auditorId) {
        setWarningMessage(
          "Você está no modo Somente Leitura, pois esta inscrição já foi revisada e auditada."
        );
        return true;
      }
      return false;
    };

    const isIgualAoRevisor = (userId: number, revisorId: number) => {
      if (userId === revisorId) {
        setWarningMessage(
          "Você está no modo Somente Leitura, pois o(a) auditor(a) deve ser diferente do(a) revisor(a)."
        );
        return true;
      }
      return false;
    };

    const isReadOnly = (
      userId: number,
      revisorId: number,
      auditorId: number
    ) => {
      return (
        isRevisadaEAuditada(revisorId, auditorId) ||
        isIgualAoRevisor(userId, revisorId)
      );
    };

    const checkEtapaAtual = (etapaAtual: IEtapa) => {
      const etapasValidas = [
        EtapasEnum.ANALISE_DE_INSCRICOES,
        EtapasEnum.RESULTADO_EM_BREVE,
      ];
      const isEtapaDisabled = !editalService.isEtapaValida(
        etapaAtual,
        etapasValidas
      );
      if (isEtapaDisabled) {
        setReadOnly(true);
      }
      setIsAnaliseDeInscricoes(editalService.isAnaliseDeInscricoes(etapaAtual));
    };

    if (user && editalId && inscricaoId) {
      setLoadingDadosAluno(true);
      setLoadingEtapaAtual(true);
      setLoadingProcessoSeletivo(true);
      getDetalhesInscricaoProfessor(inscricaoId, editalId)
        .then(({ data }) => {
          if (isReadOnly(user.id, data?.revisor_id, data?.auditor_id)) {
            setReadOnly(true);
          }
          setDadosInscricao(data);
          setIsAuditoria(Boolean(data?.revisor_id));
          setRevisorName(data.revisor);
          setAuditorName(data.auditor);
        })
        .catch()
        .finally(() => {
          setLoadingDadosAluno(false);
        });
      getDetailsProcessoSeletivo(editalId)
        .then(({ data }) => {
          setEdital(data);
        })
        .catch()
        .finally(() => {
          setLoadingProcessoSeletivo(false);
        });
      getEtapaAtualProcessoSeletivo(Number(editalId))
        .then(({ data }) => {
          checkEtapaAtual(data);
        })
        .catch()
        .finally(() => {
          setLoadingEtapaAtual(false);
        });
    }
  }, [editalId, navigate, user, inscricaoId]);

  return loadingEtapaAtual || loadingProcessoSeletivo ? (
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
      {isAnaliseDeInscricoes && warningMessage && (
        <Alert severity="warning">{warningMessage}</Alert>
      )}
      <Card sx={{ width: 800, mt: 5 }}>
        <CardHeader
          title={`${isAuditoria ? "Auditar" : "Revisar"} Inscrição`}
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
          <List sx={{ pb: 2 }}>
            {revisorName && (
              <ListItem disableGutters sx={{ color: "success.main" }}>
                <CheckCircleIcon sx={{ mr: 0.5 }} />
                <Typography sx={{ fontWeight: "bold" }}>
                  Revisado por {revisorName}
                </Typography>
              </ListItem>
            )}
            {auditorName && revisorName && (
              <ListItem disableGutters sx={{ color: "success.main" }}>
                <CheckCircleIcon sx={{ mr: 0.5 }} />
                <Typography sx={{ fontWeight: "bold" }}>
                  Auditado por {auditorName}
                </Typography>
              </ListItem>
            )}
          </List>
          <DadosCandidato dadosInscrito={dadosInscricao?.aluno} />
          {editalId && inscricaoId && dadosInscricao && (
            <RevisarAuditarInscricao
              editalId={editalId}
              inscricaoId={inscricaoId}
              isAuditoria={isAuditoria}
              isReadOnly={readOnly}
              dadosInscricao={dadosInscricao}
              loadingDadosInscricao={loadingDadosAluno}
              setInscricaoError={setInscricaoError}
            />
          )}
        </CardContent>
      </Card>
    </Grid>
  );
}
