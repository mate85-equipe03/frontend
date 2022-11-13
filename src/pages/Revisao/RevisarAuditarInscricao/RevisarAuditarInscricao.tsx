import React from "react";
import { Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import FormInscricao from "../../Edital/Inscricao/Components/FormInscricao";
import ProducoesCientificas from "../../Edital/Inscricao/Components/ProducoesCientificasDjair";
import { IDetalhesInscricao } from "../Interfaces";

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
        actionAfterRequestSuccess={actionAfterRequestSuccess}
        setInscricaoError={setInscricaoError}
      />
      <Typography variant="h6" sx={{ mt: 3 }}>
        Produções Científicas
      </Typography>
      <ProducoesCientificas />
    </>
  );
}
