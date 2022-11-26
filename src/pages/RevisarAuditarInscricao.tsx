import React from "react";
import { Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import FormInscricao from "../components/Inscricao/FormInscricao";
import {
  IDetalhesInscricao,
  IRevisarAuditar,
  IInscricaoData,
} from "../interfaces/Interfaces";
import { patchAuditarInscricao, patchRevisarInscricao } from "../services/Api";

interface IProps {
  editalId: number;
  inscricaoId: number;
  isAuditoria: boolean;
  isReadOnly: boolean;
  dadosInscricao: IDetalhesInscricao;
  loadingDadosInscricao: boolean;
  setInscricaoError: (error: boolean) => void;
}

export default function RevisarAuditarInscricao({
  editalId,
  inscricaoId,
  isAuditoria,
  isReadOnly,
  dadosInscricao,
  loadingDadosInscricao,
  setInscricaoError,
}: IProps) {
  const navigate = useNavigate();

  const submitRequest = (inscricaoData: IInscricaoData) => {
    const payload: IRevisarAuditar = {
      id: inscricaoData.id_inscricao,
      nota_final: inscricaoData.nota_final,
      observacao: inscricaoData.observacao_professor,
    };

    return (
      isAuditoria
        ? patchAuditarInscricao(payload)
        : patchRevisarInscricao(payload)
    )
      .then(() => {
        const state = isAuditoria ? { auditoria: true } : { revisao: true };
        setInscricaoError(false);
        navigate(`/edital/${editalId}/inscritos`, { state });
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
        readOnly={isReadOnly}
        editalId={editalId}
        inscricaoId={inscricaoId}
        dadosInscricao={dadosInscricao}
        btnText={`Finalizar ${isAuditoria ? "auditoria" : "revisão"}`}
        isTeacher
        submitRequest={submitRequest}
        loadingDadosInscricao={loadingDadosInscricao}
      />
    </>
  );
}
