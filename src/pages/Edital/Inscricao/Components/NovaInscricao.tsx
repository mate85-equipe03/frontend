import React, { useState } from "react";
import Etapa1 from "./Etapa1";
import Etapa2 from "./Etapa2";

interface IProps {
  setInscricaoError: (error: boolean) => void;
}

export default function NovaInscricao({ setInscricaoError }: IProps) {
  const [inscricaoId, setInscricaoId] = useState<number>();
  const [currentEtapa, setCurrentEtapa] = useState<1 | 2>(1);

  return currentEtapa === 1 || !inscricaoId ? (
    <Etapa1
      inscricaoId={inscricaoId}
      setInscricaoId={setInscricaoId}
      setInscricaoError={setInscricaoError}
      setCurrentEtapa={setCurrentEtapa}
    />
  ) : (
    <Etapa2 inscricaoId={inscricaoId} setCurrentEtapa={setCurrentEtapa} />
  );
}
