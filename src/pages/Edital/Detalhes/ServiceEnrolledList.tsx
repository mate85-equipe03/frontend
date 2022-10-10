import api from "../../../services/Api";

const getEnrolledList = (editalId: string | undefined) => {
  return api.get<any>(`/processos-seletivos/${editalId}/inscricao`);
};

export default getEnrolledList;
