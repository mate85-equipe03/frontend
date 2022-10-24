import api from "../../services/Api";
import { IDetalhes } from "./Interfaces";

export const getDetalhesInscricaoProfessor = (
  inscricaoId: string,
  editalId: string
) => {
  return api.get<IDetalhes>(
    `/processos-seletivos/${editalId}/inscricoes/${inscricaoId}`
  );
};

export const getDetalhesInscricaoAluno = (editalId: string) => {
  return api.get<IDetalhes>(`/processos-seletivos/${editalId}/inscricao`);
};
