import api from "../../../services/Api";
import { IADetalhes, IInscritos } from "./Interfaces";

const getEnrolledList = (editalId: string) => {
  return api.get<IADetalhes[]>(`/processos-seletivos/${editalId}/inscricoes`);
};

const getEnrolledDetails = (editalId: string) => {
  return api.get<IInscritos>(`/processos-seletivos/${editalId}`);
};

export { getEnrolledDetails, getEnrolledList };
