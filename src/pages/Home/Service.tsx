import api from "../../services/Api";
import { IEditaisReq } from "./Types";

const getAllProcessosSeletivos = () => {
  return api.get<IEditaisReq>("/processos-seletivos");
};

export default getAllProcessosSeletivos ;
