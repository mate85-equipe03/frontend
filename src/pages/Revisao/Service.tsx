import api from "../../services/Api";
import { IDetalhesInscricao } from "./Interfaces";

export const getDetalhesInscricaoProfessor = (
  inscricaoId: number,
  editalId: number
) => {
  return api.get<IDetalhesInscricao>(
    `/processos-seletivos/${editalId}/inscricoes/${inscricaoId}`
  );
};

export const getDetalhesInscricaoAluno = (editalId: number) => {
  return api.get<IDetalhesInscricao>(
    `/processos-seletivos/${editalId}/inscricao`
  );
};
