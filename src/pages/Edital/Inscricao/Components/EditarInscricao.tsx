import React from "react";
import { Typography } from "@mui/material";
import FormInscricao from "./FormInscricao";
import ProducoesCientificas from "./ProducoesCientificasDjair";
import { useNavigate } from "react-router-dom";

interface IProps {
  inscricaoId: number;
  // setCurrentEtapa: (etapa: 1 | 2) => void;
  setInscricaoError: (error: boolean) => void;
  // setInscricaoId: (id: number | null) => void;
}

//export default function EditarInscricao({ setCurrentEtapa, setInscricaoError, setInscricaoId }: IProps) {
export default function EditarInscricao({
  setInscricaoError,
  inscricaoId,
}: IProps) {
  const navigate = useNavigate();
  const actionAfterRequestSuccess = (_: number) => {
    navigate("/");
    //Botar mensagem de sucesso
  };
  return (
    <>
      <Typography variant="h6" sx={{ mt: 3 }}>
        Editar Dados Básicos da Inscrição
      </Typography>
      <FormInscricao
        inscricaoId={inscricaoId}
        displayCheckboxes={false}
        actionAfterRequestSuccess={actionAfterRequestSuccess}
        setInscricaoError={setInscricaoError}
      ></FormInscricao>
      <Typography variant="h6" sx={{ mt: 3 }}>
        Editar Produções Científicas
      </Typography>
      <ProducoesCientificas />
    </>
  );
}
