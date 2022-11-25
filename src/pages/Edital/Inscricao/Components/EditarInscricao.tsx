import React, { useEffect, useState } from "react";
import { Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import FormInscricao from "./FormInscricao";
import ProducoesCientificas from "./ProducoesCientificasDjair";
import { getDetalhesInscricaoAluno } from "../../../Revisao/Service";
import { IDetalhesInscricao } from "../../../Revisao/Interfaces";
import { IFile, IInscricaoData, IInscricaoDataReq } from "../Interfaces";
import { patchInscricao } from "../Service";
import Loading from "../../../../Components/Loading";

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
    return patchInscricao(payload)
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
    setLoadingDetalhesInscricao(true);
    getDetalhesInscricaoAluno(editalId).then(({ data }) => {
      setDadosInscricao(data);
      setLoadingDetalhesInscricao(false);
    });
  }, [editalId]);

  return loadingDetalhesInscricao ? (
    <Loading />
  ) : (
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
        actionAfterRequestSuccess={actionAfterRequestSuccess}
        readOnly={readOnly}
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
