import React, { useEffect, useState } from "react";
import { Typography } from "@mui/material";
import FormInscricao from "./FormInscricao";
import { getDetalhesInscricaoAluno } from "../../../Revisao/Service";
import { IDetalhesInscricao } from "../../../Revisao/Interfaces";
import postInscricao from "../Service";
import { IFile, IInscricaoData, IInscricaoDataReq } from "../Interfaces";

interface IProps {
  editalId: number;
  inscricaoId: number | undefined;
  setInscricaoId: (id: number) => void;
  setCurrentEtapa: (etapa: 0 | 1 | 2) => void;
  setInscricaoError: (error: boolean) => void;
}

export default function Etapa1({
  editalId,
  inscricaoId,
  setInscricaoId,
  setCurrentEtapa,
  setInscricaoError,
}: IProps) {
  const [dadosInscricao, setDadosInscricao] = useState<IDetalhesInscricao>();

  const actionAfterRequestSuccess = (isncricaoId: number) => {
    setInscricaoId(isncricaoId);
    setCurrentEtapa(1);
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

    // if (inscricaoId) {
    // Editar Inscrição
    // TODO: Implementar rota do back para atualizar inscrição
    // } else {
    // Nova Inscrição
    return postInscricao(payload)
      .then(({ data }) => {
        setInscricaoError(false);
        actionAfterRequestSuccess(data.id);
      })
      .catch(() => {
        setInscricaoError(true);
        window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
      });
    // }
  };

  useEffect(() => {
    if (inscricaoId) {
      // TODO: loading
      getDetalhesInscricaoAluno(editalId).then(({ data }) => {
        setDadosInscricao(data);
      });
    }
  }, [editalId, inscricaoId]);

  return (
    <>
      <Typography variant="h6" sx={{ mt: 3 }}>
        Formulário de Inscrição
      </Typography>
      <FormInscricao
        editalId={editalId}
        inscricaoId={inscricaoId}
        dadosInscricao={dadosInscricao}
        btnText="Continuar"
        isTeacher={false}
        actionAfterRequestSuccess={actionAfterRequestSuccess}
        submitRequest={submitRequest}
      />
    </>
  );
}
