import api from "../../services/Api";
import { IDetalhes } from "./Interfaces";

const getDetalhesInscricaoAluno = (
  editalId: string | undefined,
  token: string | undefined
) => {
  return api.get<IDetalhes>(`/processos-seletivos/${editalId}/inscricao`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export default getDetalhesInscricaoAluno;
