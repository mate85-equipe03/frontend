import React, { useState } from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import { Divider, StepConnector } from "@mui/material";
import Etapa2 from "./Etapa2";
import Etapa1 from "./Etapa1";
import InscricaoConcluida from "./InscricaoConcluida";

interface IProps {
  setInscricaoError: (error: boolean) => void;
}

export default function NovaInscricao({ setInscricaoError }: IProps) {
  const steps = ["Dados Básicos da Inscrição", "Produções Científicas"];
  const [inscricaoId, setInscricaoId] = useState<number>();
  const [currentEtapa, setCurrentEtapa] = useState<0 | 1 | 2>(0);

  const etapaContent = () => {
    switch (currentEtapa) {
      case 0: {
        return (
          <Etapa1
            inscricaoId={inscricaoId}
            setInscricaoId={setInscricaoId}
            setInscricaoError={setInscricaoError}
            setCurrentEtapa={setCurrentEtapa}
          />
        );
      }
      case 1: {
        return inscricaoId ? (
          <Etapa2 inscricaoId={inscricaoId} setCurrentEtapa={setCurrentEtapa} />
        ) : (
          <div />
        );
      }
      case 2: {
        return <InscricaoConcluida />;
      }
      default: {
        return <div />;
      }
    }
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Divider sx={{ my: 3 }} />
      <Stepper
        sx={{ pt: 2, pb: 1 }}
        activeStep={currentEtapa}
        connector={<StepConnector sx={{ px: 1 }} />}
      >
        {steps.map((label) => {
          return (
            <Step sx={{ px: 0 }} key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>

      <Box sx={{ mt: 2, mb: 1 }}>{etapaContent()}</Box>
    </Box>
  );
}
