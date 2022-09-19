import api from "../../services/Api";
import { IEditaisReq } from "./Types";

export const getAllProcessosSeletivos = () => {
  return api.get<IEditaisReq>("/processos-seletivos");
};
