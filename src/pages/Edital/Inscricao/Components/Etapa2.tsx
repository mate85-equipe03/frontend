import React from "react";
import { Button, Grid, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ProducoesCientificas from "./ProducoesCientificasDjair";

interface IProps {
  inscricaoId: number;
  setCurrentEtapa: (etapa: 1 | 2) => void;
}

export default function Etapa2({
  inscricaoId, // eslint-disable-line @typescript-eslint/no-unused-vars
  setCurrentEtapa,
}: IProps) {
  const navigate = useNavigate();

  const voltar = () => {
    setCurrentEtapa(1);
  };

  const finalizar = () => {
    navigate("/");
    // Botar mensagem de sucesso
  };

  return (
    <>
      <Typography variant="h6" sx={{ mt: 3 }}>
        Produções Científicas
      </Typography>
      <ProducoesCientificas />
      <Grid sx={{ mt: 4 }} container justifyContent="space-between">
        <Button onClick={voltar}> Voltar </Button>
        <Button onClick={finalizar}> Finalizar </Button>
      </Grid>
    </>
  );
}
