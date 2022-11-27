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
import { getDadosAluno, getDetailsProcessoSeletivo } from "../services/Api";
import { IDados } from "../interfaces/Interfaces";
import DadosCandidato from "../components/DadosCandidato";
import EditarInscricao from "../components/Inscricao/EditarInscricao";
import NovaInscricao from "../components/Inscricao/NovaInscricao";

export default function InscricaoStudentView() {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const [loadingDadosAluno, setLoadingDadosAluno] = useState<boolean>(false);
  const [loadingProcessoSeletivo, setLoadingProcessoSeletivo] =
    useState<boolean>(false);
  const [inscricaoError, setInscricaoError] = React.useState<boolean>(false);
  const [editalName, setEditalName] = useState<string>();
  const [dadosAluno, setDadosAluno] = useState<IDados | undefined>();
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
      setLoadingProcessoSeletivo(true);
      getDadosAluno()
        .then(({ data }) => {
          setDadosAluno(data);
        })
        .catch(() => {})
        .finally(() => {
          setLoadingDadosAluno(false);
        });
      getDetailsProcessoSeletivo(editalId)
        .then(({ data }) => {
          if (data?.arquivado) {
            if (!data?.idInscricao) {
              redirectToDetails();
            } else {
              setReadOnly(true);
            }
          }
          setEditalName(data?.titulo);
          setInscricaoId(data?.idInscricao);
        })
        .catch(() => {})
        .finally(() => {
          setLoadingProcessoSeletivo(false);
        });
    }
  }, [editalId, navigate, user]);

  return loadingDadosAluno || loadingProcessoSeletivo ? (
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
          subheader={editalName}
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
