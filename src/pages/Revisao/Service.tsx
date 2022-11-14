import api from "../../services/Api";
import { IDetalhesInscricao, IPostRevisar } from "./Interfaces";

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

export const patchRevisarInscricao = (payload: IPostRevisar) => {
  return api.patch("/inscricoes/revisa-inscricao", payload);
};
