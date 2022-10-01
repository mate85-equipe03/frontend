import api from "../../services/Api";
import { IDetails } from "./Types";

const getDetailsProcessoSeletivo = (editalId: string | undefined) => {
  return api.get<IDetails>(`/processos-seletivos/${editalId}`);
};

export default getDetailsProcessoSeletivo;