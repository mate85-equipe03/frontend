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
import postInscricao from "../Service";
import BtnSubmitLoading from "../../../../Components/BtnSubmitLoading";
import { IEditInscricao } from "../Interfaces";
import api from "../../../../services/Api";
import UserContext from "../../../../context/UserContext";

interface IProps {
  editalId: number;
  inscricaoId: number | undefined;
  displayCheckboxes: boolean;
  btnText: string;
  actionAfterRequestSuccess: (isncricaoId: number) => void;
  setInscricaoError: (error: boolean) => void;
}

export default function FormInscricao({
  editalId,
  inscricaoId, // eslint-disable-line @typescript-eslint/no-unused-vars
  btnText,
  displayCheckboxes,
  setInscricaoError,
  actionAfterRequestSuccess,
}: IProps) {
  const [countFiles, setCountFiles] = useState<number>(0);
  const [loadingInscricao, setLoadingInscricao] = useState<boolean>(false);

  const initialInscricaoData = {
    historico_graduacao_file: [],
    historico_posgraduacao_file: [],
    url_enade: "",
    processo_seletivo_id: Number(editalId),
  };

  const [inscricaoData, setInscricaoData] =
    React.useState<IInscricaoData>(initialInscricaoData);

  // TODO: if inscricaoId => getDadosInscricao (botar loading)
  // Editar Inscricao
  const { user } = useContext(UserContext);

  const getDadosInscricao = (editalId: number) => {
    return api.get<IEditInscricao>(
      `/processos-seletivos/${editalId}/inscricao`
    );
  };

  const getBlobPDF = (historico: IHistorico) => {
    console.log("blob", historico);
    
    const url =
      "https://cdn-icons-png.flaticon.com/512/1256/1256397.png?w=2000";
    // "https://www.africau.edu/images/default/sample.pdf";
    let blob = fetch(url)
      .then((r) => r.blob())
      .then((blobFile) => {
        const file = new File([blobFile], historico.filename, {
          type: "image/png", //"application/pdf", //"image/png",
        });

        console.log(file);

        const newFile = {
          id: historico.id,
          fileData: file,
        };

        if (historico.tipo === "GRADUACAO"){
          setHistoricosGraduacao([newFile]);
        }

        if (historico.tipo === "POS_GRADUACAO"){
          setHistoricosPosGraduacao([newFile]);
        }


      });
  };

  useEffect(() => {
    if (editalId && inscricaoId && user) {
      getDadosInscricao(editalId).then(({ data }) => {
        data.Historico.map(historico => {
          getBlobPDF(historico);
        });

        setInscricaoData({
          ...inscricaoData,
          url_enade: data.url_enade,
        });
      });
    }
  }, []);

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

      console.log(newFiles);

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
        setInscricaoError(false);
        // TODO: [Aguardando back] Pegar id da inscricao no post
        // actionAfterRequestSuccess();
      })
      .catch(() => {
        setInscricaoError(true);
        window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
      })
      .finally(() => {
        setLoadingInscricao(false);
        setFormChanged(false);
      });
  };

  const [formChanged, setFormChanged] = useState<Boolean>(false);

  useEffect(() => {
    setFormChanged(
      JSON.stringify(initialInscricaoData) !== JSON.stringify(inscricaoData)
    );
  }, [inscricaoData]);

  useEffect(() => {
    const handler = (event: BeforeUnloadEvent) => {
      event.preventDefault();
      event.returnValue = "";
    };

    if (formChanged) {
      window.addEventListener("beforeunload", handler);
      return () => {
        window.removeEventListener("beforeunload", handler);
      };
    }
    return () => {};
  }, [formChanged]);

  return (
    <form id="inscricao-form" onChange={handleFormChange} onSubmit={sendForm}>
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

      <FormControl required fullWidth margin="normal">
        <AttachInput
          inputName="historico_posgraduacao_file"
          label="Histórico acadêmico de curso de Pós-Graduação Strictu Sensu ou comprovação de disciplinas cursadas"
          multipleFiles={false}
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
        <Button onClick={() => actionAfterRequestSuccess(1)}>
          Simular um ok sem enviar pro back
        </Button>
      </Grid>
    </form>
  );
}
