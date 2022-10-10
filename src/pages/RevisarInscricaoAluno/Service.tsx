import api from "../../services/Api";
import { ADetalhes } from "./Interfaces";

const getDetalhesInscricaoAluno = (
  editalId: string | undefined,
  token: string | undefined
) => {
  return api.get<ADetalhes>(`/processos-seletivos/${editalId}/inscricao`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  );
};

export default getDetalhesInscricaoAluno;