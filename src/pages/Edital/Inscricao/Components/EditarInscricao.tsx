import React, { useEffect, useState } from "react";
import { Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import FormInscricao from "./FormInscricao";
import ProducoesCientificas from "./ProducoesCientificasDjair";
import { getDetalhesInscricaoAluno } from "../../../Revisao/Service";
import { IDetalhesInscricao } from "../../../Revisao/Interfaces";

interface IProps {
  editalId: number;
  inscricaoId: number;
  setInscricaoError: (error: boolean) => void;
}

export default function EditarInscricao({
  editalId,
  inscricaoId,
  setInscricaoError,
}: IProps) {
  const navigate = useNavigate();

  const [dadosInscricao, setDadosInscricao] = useState<IDetalhesInscricao>();

  const actionAfterRequestSuccess = (
    _: number // eslint-disable-line @typescript-eslint/no-unused-vars
  ) => {
    navigate("/", { state: { editInscricao: true } });
  };

  useEffect(() => {
    // TODO: loading
    getDetalhesInscricaoAluno(editalId).then(({ data }) => {
      setDadosInscricao(data);
    });
  }, [editalId]);

  return (
    <>
      <Typography variant="h6" sx={{ mt: 3 }}>
        Editar Dados Básicos da Inscrição
      </Typography>
      <FormInscricao
        editalId={editalId}
        inscricaoId={inscricaoId}
        dadosInscricao={dadosInscricao}
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
