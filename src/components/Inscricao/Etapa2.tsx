import React from "react";
import { Button, Grid, Typography } from "@mui/material";
import ProducoesCientificas from "./ProducoesCientificas";

interface IProps {
  editalId: number;
  inscricaoId: number;
  setCurrentEtapa: (etapa: 0 | 1 | 2) => void;
}

export default function Etapa2({
  inscricaoId,
  editalId,
  setCurrentEtapa,
}: IProps) {
  const voltar = () => {
    setCurrentEtapa(0);
  };

  const finalizar = () => {
    setCurrentEtapa(2);
  };

  return (
    <>
      <Typography variant="h6" sx={{ mt: 3 }}>
        Produções Científicas
      </Typography>
      <ProducoesCientificas
        readOnly={false}
        inscricaoId={inscricaoId}
        editalId={editalId}
      />
      <Grid sx={{ mt: 4 }} container justifyContent="space-between">
        <Button color="inherit" onClick={voltar}>
          Voltar
        </Button>
        <Button onClick={finalizar}> Finalizar </Button>
      </Grid>
    </>
  );
}
