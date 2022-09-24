import api from "../../services/Api";
import { IDetails } from "./Types";

const getDetailsProcessoSeletivo = (edital_id: string | undefined) => {
  return api.get<IDetails>("/processos-seletivos/" + edital_id);
};

export default getDetailsProcessoSeletivo;
