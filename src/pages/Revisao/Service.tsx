import api from "../../services/Api";
import { IDetalhesInscricao, IRevisarAuditar } from "./Interfaces";

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

export const patchRevisarInscricao = (payload: IRevisarAuditar) => {
  return api.patch("/inscricoes/revisa-inscricao", payload);
};

export const patchAuditarInscricao = (payload: IRevisarAuditar) => {
  return api.patch("/inscricoes/audita-inscricao", payload);
};
