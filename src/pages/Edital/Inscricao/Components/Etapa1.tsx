import React from "react";
import { Typography } from "@mui/material";
import FormInscricao from "./FormInscricao";

interface IProps {
  inscricaoId: number | undefined;
  setInscricaoId: (id: number) => void;
  setCurrentEtapa: (etapa: 1 | 2) => void;
  setInscricaoError: (error: boolean) => void;
}

export default function Etapa1({
  inscricaoId,
  setInscricaoId,
  setCurrentEtapa,
  setInscricaoError,
}: IProps) {
  const actionAfterRequestSuccess = (isncricaoId: number) => {
    setInscricaoId(isncricaoId);
    setCurrentEtapa(2);
  };

  return (
    <>
      <Typography variant="h6" sx={{ mt: 3 }}>
        Formulário de Inscrição
      </Typography>
      <FormInscricao
        inscricaoId={inscricaoId}
        btnText="Continuar"
        displayCheckboxes
        actionAfterRequestSuccess={actionAfterRequestSuccess}
        setInscricaoError={setInscricaoError}
      />
    </>
  );
}
