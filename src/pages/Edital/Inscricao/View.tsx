import React, { useEffect, useState } from "react";
import {
  Grid,
  Button,
  Card,
  CardHeader,
  CardContent,
  Divider,
  FormControl,
  FormControlLabel,
  InputLabel,
  OutlinedInput,
  Checkbox,
  FormGroup,
  Typography,
  Alert,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import AttachInput from "./Components/AttachInput";
import { IInscricaoData, IFile, IInscricaoDataReq } from "./Interfaces";
import getDetailsProcessoSeletivo from "../Detalhes/Service";
import Loading from "../../../Components/Loading";
import postInscricao from "./Service";

const checkboxes = [
  {
    id: 0,
    value: false,
    label:
      "Li e estou ciente dos critérios de concessão de bolsa, tal qual estabelecida na Resolução 03/2022 - PGCOMP.",
  },
  {
    id: 1,
    value: false,
    label:
      "Meu (minha) orientador(a) tem ciência da minha participação nesse Edital de Concessão de Bolsas.",
  },
  {
    id: 2,
    value: false,
    label:
      "Venho, por meio deste formulário, requerer uma bolsa de estudos do PGCOMP. Tenho ciência de que, para receber bolsa de estudos, preciso ter dedicação exclusiva ao curso.",
  },
];

export default function Inscricao() {
  const navigate = useNavigate();
  const { editalId } = useParams();
  const [countFiles, setCountFiles] = useState<number>(0);
  const [loadingEdital, setLoadingEdital] = useState<boolean>(false);
  const [loadingInscricao, setLoadingInscricao] = useState<boolean>(false);
  const [inscricaoError, setInscricaoError] = React.useState<boolean>(false);
  const [inscricaoSuccess, setInscricaoSuccess] =
    React.useState<boolean>(false);
  const [editalName, setEditalName] = useState<string>();
  const [inscricaoData, setInscricaoData] = React.useState<IInscricaoData>({
    historico_graduacao_file: [],
    historico_posgraduacao_file: [],
    url_enade: "",
    processo_seletivo_id: Number(editalId),
  });

  useEffect(() => {
    const redirectToDetails = () => {
      navigate(`/edital/${editalId}/detalhes`);
    };

    setLoadingEdital(true);
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
        setLoadingEdital(false);
      });
  }, [editalId, navigate]);

  const setHistoricosGraduacao = (historicosGraduacao: IFile[]) => {
    setInscricaoData({
      ...inscricaoData,
      historico_graduacao_file: historicosGraduacao,
    });
  };

  const setHistoricosPosGraduacao = (historicosPosGraduacao: IFile[]) => {
    setInscricaoData({
      ...inscricaoData,
      historico_posgraduacao_file: historicosPosGraduacao,
    });
  };

  const handleFileInputChange = (event: React.ChangeEvent<HTMLFormElement>) => {
    const previousValue =
      inscricaoData[event.target.name as keyof IInscricaoData];
    const isPreviousValueAnArray = previousValue instanceof Array;
    const previousFiles: IFile[] = isPreviousValueAnArray ? previousValue : [];

    let currentCount = countFiles;
    const eventFiles = event.target.files;
    if (eventFiles) {
      const newFiles = Array.from(eventFiles)?.map((file) => {
        return { id: ++currentCount, fileData: file };
      });

      setCountFiles(currentCount);
      setInscricaoData({
        ...inscricaoData,
        [event.target.name]: [...previousFiles, ...newFiles],
      });
    }
  };

  const handleFormChange = (event: React.ChangeEvent<HTMLFormElement>) => {
    if (event.target.type === "file") {
      handleFileInputChange(event);
    } else if (event.target.type !== "checkbox") {
      setInscricaoData({
        ...inscricaoData,
        [event.target.name]: event.target.value,
      });
    }
  };

  const sendForm = (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();

    const removeFileId = (filesWithId: IFile[]) => {
      return filesWithId.map((historico) => historico.fileData);
    };

    const payload: IInscricaoDataReq = {
      ...inscricaoData,
      historico_graduacao_file: removeFileId(
        inscricaoData.historico_graduacao_file
      ),
      historico_posgraduacao_file: removeFileId(
        inscricaoData.historico_posgraduacao_file
      ),
    };

    setLoadingInscricao(true);
    postInscricao(payload)
      .then(() => {
        setInscricaoSuccess(true);
      })
      .catch(() => {
        setInscricaoError(true);
      })
      .finally(() => {
        setLoadingInscricao(false);
        window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
      });
  };

  return loadingEdital ? (
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
      {inscricaoSuccess && (
        <Alert severity="success">
          Inscrição realizada com sucesso.
          <br /> [Melhorar esse texto] Lembrando que você deve preencher as
          produções científicas para concluir sua inscrição.
        </Alert>
      )}
      <Card sx={{ minWidth: { md: 500 }, maxWidth: 800, mt: 5 }}>
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
          <form
            id="inscricao-form"
            onChange={handleFormChange}
            onSubmit={sendForm}
          >
            <FormControl required fullWidth margin="normal">
              {/* Visível apenas para mestrandos calouros  */}
              <AttachInput
                inputName="historico_graduacao_file"
                label="Histórico acadêmico de curso(s) de graduação"
                files={inscricaoData.historico_graduacao_file}
                setFiles={setHistoricosGraduacao}
              />
            </FormControl>

            <FormControl required fullWidth margin="normal">
              <AttachInput
                inputName="historico_posgraduacao_file"
                label="Histórico acadêmico de curso(s) de Pós-Graduação Strictu Sensu ou comprovação de disciplinas cursadas"
                files={inscricaoData.historico_posgraduacao_file}
                setFiles={setHistoricosPosGraduacao}
              />
            </FormControl>

            <FormControl required fullWidth margin="normal" sx={{ mt: 3 }}>
              <InputLabel htmlFor="url_enade">
                Link para o ENADE do seu curso de graduação
              </InputLabel>
              <OutlinedInput
                id="url_enade"
                name="url_enade"
                label="Link para o ENADE do seu curso de graduação"
                placeholder="https://emec.mec.gov.br"
                type="url"
                value={inscricaoData.url_enade}
              />
            </FormControl>

            <FormControl
              required
              fullWidth
              margin="normal"
              sx={{
                color: "#00000099",
                mt: 3,
              }}
            >
              <Typography variant="body1" sx={{ pb: 1 }}>
                Marque as opções que se aplicam *
              </Typography>

              <FormGroup>
                {checkboxes.map((checkbox) => {
                  return (
                    <FormControlLabel
                      key={checkbox.id}
                      label={checkbox.label}
                      control={
                        <Checkbox
                          required
                          id={`checkbox-${checkbox.id}`}
                          name={`${checkbox.id}`}
                        />
                      }
                      sx={{
                        py: 1,
                      }}
                    />
                  );
                })}
              </FormGroup>
            </FormControl>

            <Grid
              container
              direction="row"
              justifyContent="flex-end"
              sx={{ mt: 1 }}
            >
              {/* TODO: Usar novo botão de loaging */}
              {!loadingInscricao && (
                <Button type="submit" form="inscricao-form" size="large">
                  Enviar
                </Button>
              )}
            </Grid>
          </form>
        </CardContent>
      </Card>
    </Grid>
  );
}
