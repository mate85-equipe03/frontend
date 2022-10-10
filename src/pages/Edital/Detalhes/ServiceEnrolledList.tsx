import api from "../../../services/Api";
import { ADetalhes } from "./Interfaces";

const getEnrolledList = (
  editalId: string | undefined,
  token: string | undefined
) => {
  return api.get<ADetalhes[]>(`/processos-seletivos/${editalId}/inscricoes`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export default getEnrolledList;
