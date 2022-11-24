import api from "../../../services/Api";
import { IDetails } from "./Interfaces";

const getDetailsProcessoSeletivo = (editalId: number | string | undefined) => {
  return api.get<IDetails>(`/processos-seletivos/${editalId}`);
};

const deleteInscricao = (inscricaoId: number) => {
  return api.delete(`/inscricoes/${inscricaoId}`);
};

export { getDetailsProcessoSeletivo, deleteInscricao };

