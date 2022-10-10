import api from "../../../services/Api";
import { IADetalhes } from "./Interfaces";

const getEnrolledList = (
  editalId: string | undefined,
  token: string | undefined
) => {
  return api.get<IADetalhes[]>(`/processos-seletivos/${editalId}/inscricoes`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export default getEnrolledList;
