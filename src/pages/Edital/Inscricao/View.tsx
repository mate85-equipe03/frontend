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
import Loading from "../../../Components/Loading";
import UserContext from "../../../context/UserContext";
import DadosCandidato from "../../Components/DadosCandidato";
import { IDetalhes } from "../../Revisao/Interfaces";
import { getDetalhesInscricaoAluno } from "../../Revisao/Service";
import getDetailsProcessoSeletivo from "../Detalhes/Service";
import EditarInscricao from "./Components/EditarInscricao";
import NovaInscricao from "./Components/NovaInscricao";

export default function Inscricao() {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const { editalId } = useParams();
  const [loadingEdital, setLoadingEdital] = useState<boolean>(false);
  const [loadingProcessoSeletivo, setLoadingProcessoSeletivo] =
    useState<boolean>(false);
  const [inscricaoError, setInscricaoError] = React.useState<boolean>(false);
  const [editalName, setEditalName] = useState<string>();
  const [dadosAluno, setDadosAluno] = useState<IDetalhes | undefined>();

  const params = useParams();
  const inscricaoId = Number(params.inscricaoId)
    ? Number(params.inscricaoId)
    : null;

  // Proteger rotas usando isInscrito e inscricaoId (useEffect)
  // if isInscrito && !inscricaoId -> redirect to /inscricao/id (e se o id for diferente do id da inscricao da pessoa)
  // if !isInscrito && inscricaoId -> redirect to /inscricao

  // Será q realmente precisa de outra rota?

  useEffect(() => {
    const redirectToDetails = () => {
      navigate(`/edital/${editalId}/detalhes`);
    };

    if (user && editalId) {
      setLoadingEdital(true);
      setLoadingProcessoSeletivo(true);
      getDetalhesInscricaoAluno(editalId)
        .then(({ data }) => {
          setDadosAluno(data);
        })
        .catch(() => {
          // TODO: Ver como exibir erros va View
        })
        .finally(() => {
          setLoadingEdital(false);
        });
      getDetailsProcessoSeletivo(editalId)
        .then(({ data }) => {
          if (data?.arquivado) {
            redirectToDetails();
          }
          setEditalName(data?.titulo);
        })
        .catch(() => {
          // TODO: Ver como exibir erros va View
        })
        .finally(() => {
          setLoadingProcessoSeletivo(false);
        });
    }
  }, [editalId, navigate, user]);

  return loadingEdital || loadingProcessoSeletivo ? (
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
          title={`${
            inscricaoId ? "Editar" : ""
          } Inscrição em Processo Seletivo`}
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
          {inscricaoId === null ? (
            <NovaInscricao setInscricaoError={setInscricaoError} />
          ) : (
            <EditarInscricao
              inscricaoId={inscricaoId}
              setInscricaoError={setInscricaoError}
            />
          )}
        </CardContent>
      </Card>
    </Grid>
  );
}
