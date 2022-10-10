import api from "../../services/Api";
import { IDetalhes } from "./Interfaces";

const getDetalhesInscricaoAluno = (editalId: string) => {
  return api.get<IDetalhes>(`/processos-seletivos/${editalId}/inscricao`);
};

export default getDetalhesInscricaoAluno;
