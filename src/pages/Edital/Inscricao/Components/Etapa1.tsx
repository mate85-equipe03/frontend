import React, { useEffect, useState } from "react";
import { Typography } from "@mui/material";
import FormInscricao from "./FormInscricao";
import { getDetalhesInscricaoAluno } from "../../../Revisao/Service";
import { IDetalhesInscricao } from "../../../Revisao/Interfaces";

interface IProps {
  editalId: number;
  inscricaoId: number | undefined;
  setInscricaoId: (id: number) => void;
  setCurrentEtapa: (etapa: 0 | 1 | 2) => void;
  setInscricaoError: (error: boolean) => void;
}

export default function Etapa1({
  editalId,
  inscricaoId,
  setInscricaoId,
  setCurrentEtapa,
  setInscricaoError,
}: IProps) {
  const [dadosInscricao, setDadosInscricao] = useState<IDetalhesInscricao>();

  const actionAfterRequestSuccess = (isncricaoId: number) => {
    setInscricaoId(isncricaoId);
    setCurrentEtapa(1);
  };

  useEffect(() => {
    if (inscricaoId) {
      // TODO: loading
      getDetalhesInscricaoAluno(editalId).then(({ data }) => {
        setDadosInscricao(data);
      });
    }
  }, [editalId, inscricaoId]);

  return (
    <>
      <Typography variant="h6" sx={{ mt: 3 }}>
        Formulário de Inscrição
      </Typography>
      <FormInscricao
        editalId={editalId}
        inscricaoId={inscricaoId}
        dadosInscricao={dadosInscricao}
        btnText="Continuar"
        displayCheckboxes
        actionAfterRequestSuccess={actionAfterRequestSuccess}
        setInscricaoError={setInscricaoError}
      />
    </>
  );
}
