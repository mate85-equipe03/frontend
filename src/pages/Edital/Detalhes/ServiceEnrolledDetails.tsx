import api from "../../../services/Api";
import { IInscritos } from "./Interfaces";

const getEnrolledDetails = (editalId: string | undefined) => {
  return api.get<IInscritos>(`/processos-seletivos/${editalId}`);
};

export default getEnrolledDetails;
