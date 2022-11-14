import React from "react";
import { Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import FormInscricao from "../../Edital/Inscricao/Components/FormInscricao";
import { IDetalhesInscricao, IPostRevisar } from "../Interfaces";
import { IInscricaoData } from "../../Edital/Inscricao/Interfaces";
import { patchRevisarInscricao } from "../Service";

interface IProps {
  editalId: number;
  inscricaoId: number;
  isAuditoria: boolean;
  dadosInscricao: IDetalhesInscricao;
  setInscricaoError: (error: boolean) => void;
}

export default function RevisarAuditarInscricao({
  editalId,
  inscricaoId,
  isAuditoria,
  dadosInscricao,
  setInscricaoError,
}: IProps) {
  const navigate = useNavigate();

  const actionAfterRequestSuccess = (
    _: number // eslint-disable-line @typescript-eslint/no-unused-vars
  ) => {
    const state = isAuditoria ? { auditoria: true } : { revisao: true };
    navigate(`/edital/${editalId}/inscritos`, { state });
  };

  const submitRequest = (inscricaoData: IInscricaoData) => {
    const payload: IPostRevisar = {
      id: inscricaoData.id_inscricao,
      nota_final: inscricaoData.nota_final,
      observacao: inscricaoData.observacao_professor,
    };

    return patchRevisarInscricao(payload)
      .then(({ data }) => {
        setInscricaoError(false);
        actionAfterRequestSuccess(data.id);
      })
      .catch(() => {
        setInscricaoError(true);
        window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
      });
  };

  return (
    <>
      <Typography variant="h6" sx={{ mt: 3 }}>
        Dados Básicos da Inscrição
      </Typography>
      <FormInscricao
        editalId={editalId}
        inscricaoId={inscricaoId}
        dadosInscricao={dadosInscricao}
        btnText={`Finalizar ${isAuditoria ? "auditoria" : "revisão"}`}
        displayCheckboxes={false}
        isTeacher
        submitRequest={submitRequest}
        actionAfterRequestSuccess={actionAfterRequestSuccess}
      />
    </>
  );
}