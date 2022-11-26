import React, { useEffect, useState } from "react";
import { Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import FormInscricao from "./FormInscricao";
import ProducoesCientificas from "./ProducoesCientificasDjair";
import {
  getDetalhesInscricaoAluno,
  patchInscricao,
} from "../../../../services/Api";
import {
  IDetalhesInscricao,
  IFile,
  IInscricaoData,
  IInscricaoDataReq,
} from "../../../../interfaces/Interfaces";

interface IProps {
  editalId: number;
  inscricaoId: number;
  readOnly: boolean;
  setInscricaoError: (error: boolean) => void;
}

export default function EditarInscricao({
  editalId,
  inscricaoId,
  readOnly,
  setInscricaoError,
}: IProps) {
  const navigate = useNavigate();

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

    return patchInscricao(payload)
      .then(() => {
        setInscricaoError(false);
        navigate("/", { state: { editInscricao: true } });
      })
      .catch(() => {
        setInscricaoError(true);
        window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
      });
  };

  useEffect(() => {
    setLoadingDetalhesInscricao(true);
    getDetalhesInscricaoAluno(editalId).then(({ data }) => {
      setDadosInscricao(data);
      setLoadingDetalhesInscricao(false);
    });
  }, [editalId]);

  return (
    <>
      <Typography variant="h6" sx={{ mt: 3 }}>
        Dados Básicos da Inscrição
      </Typography>
      <FormInscricao
        editalId={editalId}
        inscricaoId={inscricaoId}
        dadosInscricao={dadosInscricao}
        btnText="Editar Dados Básicos"
        isTeacher={false}
        submitRequest={submitRequest}
        readOnly={readOnly}
        loadingDadosInscricao={loadingDetalhesInscricao}
      />
      {!readOnly && (
        <>
          <Typography variant="h6" sx={{ mt: 3 }}>
            Produções Científicas
          </Typography>
          <ProducoesCientificas />
        </>
      )}
    </>
  );
}
