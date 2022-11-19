import React, { useState, useEffect, useContext } from "react";
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
  Button,
} from "@mui/material";
import AttachInput from "./AttachInput";
import {
  IInscricaoData,
  IFile,
  IInscricaoDataReq,
  IHistorico,
} from "../Interfaces";
import { postInscricao, patchInscricao, getDadosInscricao } from "../Service";
import BtnSubmitLoading from "../../../../Components/BtnSubmitLoading";
import UserContext from "../../../../context/UserContext";

interface IProps {
  editalId: number;
  inscricaoId: number | undefined;
  displayCheckboxes: boolean;
  btnText: string;
  actionAfterRequestSuccess: (inscricaoId: number) => void;
  setInscricaoError: (error: boolean) => void;
}

export default function FormInscricao({
  editalId,
  inscricaoId,
  btnText,
  displayCheckboxes,
  setInscricaoError,
  actionAfterRequestSuccess,
}: IProps) {
  const [countFiles, setCountFiles] = useState<number>(0);
  const [loadingInscricao, setLoadingInscricao] = useState<boolean>(false);

  const [formChanged, setFormChanged] = useState<boolean>(false);

  const [initialInscricaoData, setInitialInscricaoData] =
    useState<IInscricaoData>({
      historico_graduacao_file: [],
      historico_posgraduacao_file: [],
      url_enade: "",
      processo_seletivo_id: editalId,
      nota_historico_graduacao_file: 0,
      nota_historico_posgraduacao_file: 0,
      nota_url_enade: 0,
    });

  const [inscricaoData, setInscricaoData] =
    useState<IInscricaoData>(initialInscricaoData);

  const [initialHistoricoGraduacao, setInitialHistoricoGraduacao] = useState<
    IFile[]
  >([]);
  const [initialHistoricoPosGrad, setInitialHistoricoPosGrad] = useState<
    IFile[]
  >([]);

  const { user } = useContext(UserContext);

  // TODO: if inscricaoId => getDadosInscricao (botar loading)
  // Editar Inscricao
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
    if (editalId && inscricaoId && user) {
      getDadosInscricao(editalId).then(({ data }) => {
        console.log(data);
        const reqInscricao = {
          historico_graduacao_file: [],
          historico_posgraduacao_file: [],
          url_enade: data.url_enade,
          processo_seletivo_id: editalId,
          nota_historico_graduacao_file: 0,
          nota_historico_posgraduacao_file: 0,
          nota_url_enade: data.nota_enade,
        };

       
        // Os históricos são setados a partir de seus respectivos useEffects
        data.Historico.forEach((historico) => {
          
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
                reqInscricao.nota_historico_posgraduacao_file = historico.nota;
              }
            });
        });

        setInitialInscricaoData(reqInscricao);
        setInscricaoData(reqInscricao);
      });
    }
  }, [editalId, inscricaoId, user]);

  // Solução provisória para popular ambos os históricos a partir do blob
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

    if (inscricaoId) {
      // Editar Inscrição
      // TODO: Implementar rota do back para atualizar inscrição
      console.log(payload);
      patchInscricao(payload)
        .then((res) => {
          setInscricaoError(false);
          actionAfterRequestSuccess(res.data.id);
        })
        .catch(() => {
          setInscricaoError(true);
          window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
        })
        .finally(() => {
          setLoadingInscricao(false);
          setFormChanged(false);
        });
    } else {
      // Nova Inscrição
      postInscricao(payload)
        .then((res) => {
          setInscricaoError(false);
          actionAfterRequestSuccess(res.data.id);
        })
        .catch(() => {
          setInscricaoError(true);
          window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
        })
        .finally(() => {
          setLoadingInscricao(false);
          setFormChanged(false);
        });
    }
  };

  // const [loadingHistoricos, setLoadingHistoricos] = useState<boolean>(false);

  useEffect(() => {
    setFormChanged(
      JSON.stringify(initialInscricaoData) !== JSON.stringify(inscricaoData)
    );

    // TODO: Implementar loading na logica de carregamento da pagina
    // if (inscricaoId) {
    //   setLoadingHistoricos(
    //     initialInscricaoData.historico_graduacao_file.length > 0 &&
    //       initialInscricaoData.historico_posgraduacao_file.length > 0
    //   );
    // }
  }, [initialInscricaoData, inscricaoData]);

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

  return (
    <form id="inscricao-form" onChange={handleFormChange} onSubmit={sendForm}>
      <Grid
        container
        direction="row"
        justifyContent="space-between"
        alignItems="flex-end"
      >
        <Grid item xs={10.7}>
          <FormControl required fullWidth margin="normal">
            {/* Visível apenas para mestrandos calouros  */}
            <AttachInput
              inputName="historico_graduacao_file"
              label="Histórico acadêmico de curso de graduação"
              multipleFiles={false}
              files={inscricaoData.historico_graduacao_file}
              setFiles={setHistoricosGraduacao}
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
              label="Histórico acadêmico de curso de Pós-Graduação Strictu Sensu ou comprovação de disciplinas cursadas"
              multipleFiles={false}
              files={inscricaoData.historico_posgraduacao_file}
              setFiles={setHistoricosPosGraduacao}
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
            <Link
              href="https://enade.inep.gov.br/enade/#!/relatorioCursos"
              target="_blank"
              align="right"
              variant="caption"
              display="block"
              gutterBottom
            >
              Relatório de cursos Enade
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
            />
          </FormControl>
        </Grid>
      </Grid>

      {displayCheckboxes && (
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
            Marque as opções que se aplicam
          </FormLabel>
          <FormGroup>
            <FormControlLabel
              sx={{ mb: 1 }}
              label="Li e estou ciente dos critérios de concessão de bolsa, tal qual estabelecida na resolução vigente."
              control={<Checkbox required id="checkbox-1" name="checkbox-1" />}
            />
            <FormControlLabel
              sx={{ mb: 1 }}
              label="Meu (minha) orientador(a) tem ciência da minha participação nesse Edital de Concessão de Bolsas."
              control={<Checkbox required id="checkbox-2" name="checkbox-2" />}
            />
            <FormControlLabel
              sx={{ mb: 1 }}
              label="Venho, por meio deste formulário, requerer uma bolsa de estudos do PGCOMP. Tenho ciência de que, para receber bolsa de estudos, preciso ter dedicação exclusiva ao curso."
              control={<Checkbox required id="checkbox-3" name="checkbox-3" />}
            />
            <FormControlLabel
              sx={{ mb: 1 }}
              label="Estou ciente de que, após o período de inscrições, caso nenhuma
              produção seja adicionada, será considerado que eu optei por não
              enviar nenhuma produção cientifica."
              control={<Checkbox required id="checkbox-4" name="checkbox-4" />}
            />
          </FormGroup>
        </FormControl>
      )}
      <Grid container direction="row" justifyContent="flex-end" sx={{ mt: 1 }}>
        <BtnSubmitLoading
          label={btnText}
          formId="inscricao-form"
          loading={loadingInscricao}
        />
        {/* TODO: Apagar esse botão */}
        {inscricaoId && (
          <Button onClick={() => actionAfterRequestSuccess(inscricaoId)}>
            Simular um ok sem enviar pro back
          </Button>
        )}
      </Grid>
    </form>
  );
}
