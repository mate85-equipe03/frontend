import React from "react";
import { Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import FormInscricao from "./FormInscricao";
import ProducoesCientificas from "./ProducoesCientificasDjair";

interface IProps {
  inscricaoId: number;
  setInscricaoError: (error: boolean) => void;
}

export default function EditarInscricao({
  setInscricaoError,
  inscricaoId,
}: IProps) {
  const navigate = useNavigate();
  const actionAfterRequestSuccess = (
    _: number // eslint-disable-line @typescript-eslint/no-unused-vars
  ) => {
    navigate("/");
    // Botar mensagem de sucesso
  };
  return (
    <>
      <Typography variant="h6" sx={{ mt: 3 }}>
        Editar Dados Básicos da Inscrição
      </Typography>
      <FormInscricao
        inscricaoId={inscricaoId}
        btnText="Editar Dados Básicos"
        displayCheckboxes={false}
        actionAfterRequestSuccess={actionAfterRequestSuccess}
        setInscricaoError={setInscricaoError}
      />
      <Typography variant="h6" sx={{ mt: 3 }}>
        Editar Produções Científicas
      </Typography>
      <ProducoesCientificas />
    </>
  );
}
