import api from "../../../services/Api";
import { IInscritos } from "./Interfaces";

const getEnrolledList = (editalId: string | undefined) => {
  return api.get<IInscritos>(`/processos-seletivos/${editalId}/inscritos`);
};

export default getEnrolledList;
