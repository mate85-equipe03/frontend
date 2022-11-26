import React, { useEffect, useState } from "react";
import { Typography } from "@mui/material";
import FormInscricao from "./FormInscricao";
import {
  getDetalhesInscricaoAluno,
  patchInscricao,
  postInscricao,
} from "../../../../services/Api";
import {
  IDetalhesInscricao,
  IFile,
  IInscricaoData,
  IInscricaoDataReq,
} from "../../../../interfaces/Interfaces";

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
  const [loadingDetalhesInscricao, setLoadingDetalhesInscricao] =
    useState(false);

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

    if (inscricaoId) {
      // Editar Inscrição
      return patchInscricao(payload)
        .then(({ data }) => {
          setInscricaoError(false);
          setInscricaoId(data.id);
          setCurrentEtapa(1);
        })
        .catch(() => {
          setInscricaoError(true);
          window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
        });
    }
    // Nova Inscrição
    return postInscricao(payload)
      .then(({ data }) => {
        setInscricaoError(false);
        setInscricaoId(data.id);
        setCurrentEtapa(1);
      })
      .catch(() => {
        setInscricaoError(true);
        window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
      });
  };

  useEffect(() => {
    if (inscricaoId) {
      setLoadingDetalhesInscricao(true);
      getDetalhesInscricaoAluno(editalId).then(({ data }) => {
        setDadosInscricao(data);
        setLoadingDetalhesInscricao(false);
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
        submitRequest={submitRequest}
        loadingDadosInscricao={loadingDetalhesInscricao}
      />
    </>
  );
}
