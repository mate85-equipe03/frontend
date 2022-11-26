import api from "../../../services/Api";
import { IADetalhes, IInscritos } from "./Interfaces";

const getEnrolledList = (editalId: string) => {
  return api.get<IADetalhes[]>(`/processos-seletivos/${editalId}/inscricoes`);
};

const getEnrolledDetails = (editalId: string) => {
  return api.get<IInscritos>(`/processos-seletivos/${editalId}`);
};

const getResultadoMestrado = (editalId: string) => {
  return api.get(`/processos-seletivos/${editalId}/resultado-final-mestrado`);
};

const getResultadoDoutorado = (editalId: string) => {
  return api.get(`/processos-seletivos/${editalId}/resultado-final-doutorado`);
};


export { getEnrolledDetails, getEnrolledList, getResultadoMestrado, getResultadoDoutorado };