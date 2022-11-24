import React, { useEffect, useState } from "react";
import { Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import FormInscricao from "./FormInscricao";
import ProducoesCientificas from "./ProducoesCientificasDjair";
import { getDetalhesInscricaoAluno } from "../../../Revisao/Service";
import { IDetalhesInscricao } from "../../../Revisao/Interfaces";
import { IFile, IInscricaoData, IInscricaoDataReq } from "../Interfaces";
import postInscricao from "../Service";

interface IProps {
  editalId: number;
  inscricaoId: number;
  setInscricaoError: (error: boolean) => void;
}

export default function EditarInscricao({
  editalId,
  inscricaoId,
  setInscricaoError,
}: IProps) {
  const navigate = useNavigate();

  const [dadosInscricao, setDadosInscricao] = useState<IDetalhesInscricao>();

  const actionAfterRequestSuccess = (
    _: number // eslint-disable-line @typescript-eslint/no-unused-vars
  ) => {
    navigate("/", { state: { editInscricao: true } });
  };

  const submitRequest = (inscricaoData: IInscricaoData) => {
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

    // Editar Inscrição
    // TODO: Implementar rota do back para atualizar inscrição
    return postInscricao(payload)
      .then(({ data }) => {
        setInscricaoError(false);
        actionAfterRequestSuccess(data.id);
      })
      .catch(() => {
        setInscricaoError(true);
        window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
      });
  };

  useEffect(() => {
    // TODO: loading
    getDetalhesInscricaoAluno(editalId).then(({ data }) => {
      setDadosInscricao(data);
    });
  }, [editalId]);

  return (
    <>
      <Typography variant="h6" sx={{ mt: 3 }}>
        Editar Dados Básicos da Inscrição
      </Typography>
      <FormInscricao
        editalId={editalId}
        inscricaoId={inscricaoId}
        dadosInscricao={dadosInscricao}
        btnText="Editar Dados Básicos"
        displayCheckboxes={false}
        isTeacher={false}
        submitRequest={submitRequest}
        actionAfterRequestSuccess={actionAfterRequestSuccess}
      />
      <Typography variant="h6" sx={{ mt: 3 }}>
        Editar Produções Científicas
      </Typography>
      <ProducoesCientificas />
    </>
  );
}
