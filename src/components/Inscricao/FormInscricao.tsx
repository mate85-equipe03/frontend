import React, { useState, useEffect } from "react";
import {
  Grid,
  FormControl,
  FormControlLabel,
  InputLabel,
  OutlinedInput,
  Checkbox,
  FormGroup,
  FormLabel,
  Link,
  Typography,
} from "@mui/material";
import {
  IInscricaoData,
  IFile,
  IDetalhesInscricao,
  IHistorico,
} from "../../interfaces/Interfaces";
import BtnSubmitLoading from "../BtnSubmitLoading";
import ProducoesCientificas from "./ProducoesCientificas";
import Loading from "../Loading";
import AttachInput from "../AttachInput";

interface IProps {
  editalId: number;
  inscricaoId: number | undefined;
  dadosInscricao: IDetalhesInscricao | undefined;
  loadingDadosInscricao: boolean;
  btnText: string;
  isTeacher: boolean;
  readOnly?: boolean;
  submitRequest: (inscricaoData: IInscricaoData) => Promise<void>;
}

export default function FormInscricao({
  editalId,
  inscricaoId,
  dadosInscricao,
  loadingDadosInscricao,
  btnText,
  isTeacher,
  readOnly,
  submitRequest,
}: IProps) {
  const [countFiles, setCountFiles] = useState<number>(1e9);
  const [formChanged, setFormChanged] = useState<boolean>(false);
  const [loadingEnvioInscricao, setLoadingEnvioInscricao] =
    useState<boolean>(false);
  const [loadingHistoricos, setLoadingHistoricos] = useState<boolean>(false);

  const [initialInscricaoData, setInitialInscricaoData] =
    useState<IInscricaoData>({
      processo_seletivo_id: editalId,
      url_enade: "",
      nota_url_enade: 0,
      historico_graduacao_file: [],
      historico_posgraduacao_file: [],
      nota_historico_graduacao_file: 0,
      nota_historico_posgraduacao_file: 0,

      // Para professor:
      id_inscricao: inscricaoId,
      nota_final: 0,
      observacao_professor: "",
    });

  const [inscricaoData, setInscricaoData] =
    useState<IInscricaoData>(initialInscricaoData);

  const [initialHistoricoGraduacao, setInitialHistoricoGraduacao] = useState<
    IFile[]
  >([]);
  const [initialHistoricoPosGrad, setInitialHistoricoPosGrad] = useState<
    IFile[]
  >([]);

  const criaFile = (blob: Blob, historico: IHistorico) => {
    const file = new File([blob], historico.filename, {
      type: "application/pdf",
    });

    const newFile = {
      id: historico.id, // TODO: verificar conflito entre ID do back e do front
      fileData: file,
    };

    return newFile;
  };

  useEffect(() => {
    if (dadosInscricao) {
      const reqInscricao: IInscricaoData = {
        processo_seletivo_id: editalId,
        url_enade: dadosInscricao.url_enade,
        nota_url_enade: dadosInscricao.nota_enade,
        historico_graduacao_file: [],
        historico_posgraduacao_file: [],
        nota_historico_graduacao_file: 0,
        nota_historico_posgraduacao_file: 0,

        // Para professor:
        id_inscricao: inscricaoId,
        nota_final: dadosInscricao.nota_final,
        observacao_professor: dadosInscricao.observacao
          ? dadosInscricao.observacao
          : "",
      };

      // Os hist??ricos s??o setados a partir de seus respectivos useEffects
      dadosInscricao.Historico.forEach((historico) => {
        const { url } = historico;

        if (historico.tipo === "GRADUACAO") {
          reqInscricao.nota_historico_graduacao_file = historico.nota;
        }
        if (historico.tipo === "POS_GRADUACAO") {
          reqInscricao.nota_historico_posgraduacao_file = historico.nota;
        }

        fetch(url)
          .then((r) => r.blob())
          .then((blobFile) => {
            const newFile = criaFile(blobFile, historico);

            if (historico.tipo === "GRADUACAO") {
              setInitialHistoricoGraduacao([newFile]);
            }

            if (historico.tipo === "POS_GRADUACAO") {
              setInitialHistoricoPosGrad([newFile]);
            }
          });
      });

      setInitialInscricaoData(reqInscricao);
      setInscricaoData(reqInscricao);
    }
  }, [dadosInscricao, editalId, inscricaoId]);

  // Solu????o provis??ria para popular ambos os hist??ricos a partir do blob
  useEffect(() => {
    setInscricaoData((prevState) => {
      return {
        ...prevState,
        historico_graduacao_file: initialHistoricoGraduacao,
      };
    });

    setInitialInscricaoData((prevState) => {
      return {
        ...prevState,
        historico_graduacao_file: initialHistoricoGraduacao,
      };
    });
  }, [initialHistoricoGraduacao]);

  useEffect(() => {
    setInscricaoData((prevState) => {
      return {
        ...prevState,
        historico_posgraduacao_file: initialHistoricoPosGrad,
      };
    });

    setInitialInscricaoData((prevState) => {
      return {
        ...prevState,
        historico_posgraduacao_file: initialHistoricoPosGrad,
      };
    });
  }, [initialHistoricoPosGrad]);

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

  const handleFileInputChange = (
    event: React.ChangeEvent<HTMLFormElement>
  ): void => {
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

    setLoadingEnvioInscricao(true);

    submitRequest(inscricaoData).finally(() => {
      setLoadingEnvioInscricao(false);
      setFormChanged(false);
    });
  };

  useEffect(() => {
    setFormChanged(
      JSON.stringify(initialInscricaoData) !== JSON.stringify(inscricaoData)
    );

    if (inscricaoId) {
      setLoadingHistoricos(
        initialInscricaoData.historico_graduacao_file.length < 1 ||
          initialInscricaoData.historico_posgraduacao_file.length < 1
      );
    } else {
      setLoadingHistoricos(false);
    }
  }, [initialInscricaoData, inscricaoData, inscricaoId]);

  useEffect(() => {
    const handler = (event: BeforeUnloadEvent) => {
      event.preventDefault();
      /* eslint-disable no-param-reassign */
      event.returnValue = "";
    };

    if (formChanged) {
      window.addEventListener("beforeunload", handler);
    }
    return () => {
      window.removeEventListener("beforeunload", handler);
    };
  }, [formChanged]);

  return loadingHistoricos || loadingDadosInscricao ? (
    <Loading />
  ) : (
    <Grid sx={{ mb: 2 }}>
      <form id="inscricao-form" onChange={handleFormChange} onSubmit={sendForm}>
        <Grid
          container
          direction="row"
          justifyContent="space-between"
          alignItems="flex-end"
        >
          <Grid item xs={10.7}>
            <FormControl required fullWidth margin="normal">
              {/* Vis??vel apenas para mestrandos calouros  */}
              <AttachInput
                inputName="historico_graduacao_file"
                label="Hist??rico acad??mico de curso de gradua????o"
                multipleFiles={false}
                files={inscricaoData.historico_graduacao_file}
                setFiles={setHistoricosGraduacao}
                disabled={isTeacher || readOnly}
              />
            </FormControl>
          </Grid>
          <Grid item xs={1} sx={{ mb: 1.1 }}>
            <FormControl>
              <InputLabel htmlFor="Nota">Nota</InputLabel>
              <OutlinedInput
                id="nota_historico_graduacao_file"
                name="nota_historico_graduacao_file"
                label="Nota"
                type="text"
                value={inscricaoData.nota_historico_graduacao_file}
                disabled={readOnly}
              />
            </FormControl>
          </Grid>
        </Grid>

        <Grid
          container
          direction="row"
          justifyContent="space-between"
          alignItems="flex-end"
        >
          <Grid item xs={10.7}>
            <FormControl required fullWidth margin="normal">
              <AttachInput
                inputName="historico_posgraduacao_file"
                label="Hist??rico acad??mico de curso de P??s-Gradua????o Strictu Sensu ou comprova????o de disciplinas cursadas"
                multipleFiles={false}
                files={inscricaoData.historico_posgraduacao_file}
                setFiles={setHistoricosPosGraduacao}
                disabled={isTeacher || readOnly}
              />
            </FormControl>
          </Grid>
          <Grid item xs={1} sx={{ mb: 1.1 }}>
            <FormControl>
              <InputLabel htmlFor="Nota">Nota</InputLabel>
              <OutlinedInput
                id="nota_historico_posgraduacao_file"
                name="nota_historico_posgraduacao_file"
                label="Nota"
                type="text"
                value={inscricaoData.nota_historico_posgraduacao_file}
                disabled={readOnly}
              />
            </FormControl>
          </Grid>
        </Grid>

        <Grid
          container
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Grid item xs={10.7}>
            <FormControl required fullWidth margin="normal" sx={{ mt: 3 }}>
              <InputLabel htmlFor="url_enade">
                Link para o ENADE do seu curso de gradua????o
              </InputLabel>
              <OutlinedInput
                id="url_enade"
                name="url_enade"
                label="Link para o ENADE do seu curso de gradua????o"
                placeholder="https://emec.mec.gov.br"
                type="url"
                value={inscricaoData.url_enade}
                disabled={isTeacher || readOnly}
              />
              <Link
                href="https://enade.inep.gov.br/enade/#!/relatorioCursos"
                target="_blank"
                align="right"
                variant="caption"
                display="block"
                gutterBottom
              >
                Relat??rio de cursos Enade
              </Link>
            </FormControl>
          </Grid>
          <Grid item xs={1} sx={{ mb: 1.1 }}>
            <FormControl>
              <InputLabel htmlFor="Nota">Nota</InputLabel>
              <OutlinedInput
                id="nota_url_enade"
                name="nota_url_enade"
                label="Nota"
                value={inscricaoData.nota_url_enade}
                disabled={readOnly}
              />
            </FormControl>
          </Grid>
        </Grid>

        {!isTeacher && (
          <FormControl
            required
            fullWidth
            margin="normal"
            sx={{
              color: "#00000099",
              m: 3,
            }}
          >
            <FormLabel component="legend">
              Marque as op????es que se aplicam
            </FormLabel>
            <FormGroup>
              <FormControlLabel
                sx={{ mb: 1 }}
                label="Li e estou ciente dos crit??rios de concess??o de bolsa, tal qual estabelecida na resolu????o vigente."
                control={
                  <Checkbox
                    required
                    id="checkbox-1"
                    name="checkbox-1"
                    defaultChecked={Boolean(inscricaoId)}
                    disabled={Boolean(inscricaoId) || readOnly}
                  />
                }
              />
              <FormControlLabel
                sx={{ mb: 1 }}
                label="Meu (minha) orientador(a) tem ci??ncia da minha participa????o nesse Edital de Concess??o de Bolsas."
                control={
                  <Checkbox
                    required
                    id="checkbox-2"
                    name="checkbox-2"
                    defaultChecked={Boolean(inscricaoId)}
                    disabled={Boolean(inscricaoId) || readOnly}
                  />
                }
              />
              <FormControlLabel
                sx={{ mb: 1 }}
                label="Venho, por meio deste formul??rio, requerer uma bolsa de estudos do PGCOMP. Tenho ci??ncia de que, para receber bolsa de estudos, preciso ter dedica????o exclusiva ao curso."
                control={
                  <Checkbox
                    required
                    id="checkbox-3"
                    name="checkbox-3"
                    defaultChecked={Boolean(inscricaoId)}
                    disabled={Boolean(inscricaoId) || readOnly}
                  />
                }
              />
              <FormControlLabel
                sx={{ mb: 1 }}
                label="Estou ciente de que, ap??s o per??odo de inscri????es, caso nenhuma
              produ????o seja adicionada, ser?? considerado que eu optei por n??o
              enviar nenhuma produ????o cientifica."
                control={
                  <Checkbox
                    required
                    id="checkbox-4"
                    name="checkbox-4"
                    defaultChecked={Boolean(inscricaoId)}
                    disabled={Boolean(inscricaoId) || readOnly}
                  />
                }
              />
            </FormGroup>
          </FormControl>
        )}

        {(isTeacher || readOnly) && (
          <>
            <Typography variant="h6" sx={{ mt: 1 }}>
              Produ????es Cient??ficas
            </Typography>
            {inscricaoId && (
              <ProducoesCientificas
                readOnly={Boolean(readOnly)}
                inscricaoId={inscricaoId}
                editalId={editalId}
              />
            )}
            <Typography variant="h6" sx={{ mt: 5 }}>
              Revis??o/Auditoria
            </Typography>
            <FormControl fullWidth margin="normal">
              <InputLabel htmlFor="observacao_professor">
                Observa????es
              </InputLabel>
              <OutlinedInput
                multiline
                rows={3}
                id="observacao_professor"
                name="observacao_professor"
                label="Observa????es"
                value={inscricaoData.observacao_professor}
                disabled={readOnly}
              />
            </FormControl>
            <FormControl required fullWidth margin="normal" sx={{ mt: 3 }}>
              <InputLabel htmlFor="nota_final">Nota Final</InputLabel>
              <OutlinedInput
                id="nota_final"
                name="nota_final"
                label="Nota Final"
                placeholder="10.0"
                value={inscricaoData.nota_final}
                disabled={readOnly}
              />
            </FormControl>
          </>
        )}

        {!readOnly && (
          <Grid
            container
            direction="row"
            justifyContent="flex-end"
            sx={{ mt: 1 }}
          >
            <BtnSubmitLoading
              label={btnText}
              formId="inscricao-form"
              loading={loadingEnvioInscricao}
            />
          </Grid>
        )}
      </form>
    </Grid>
  );
}

FormInscricao.defaultProps = {
  readOnly: false,
};
