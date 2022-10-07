import api from "../../../services/Api";
import { IInscricaoDataReq } from "./Interfaces";

const postInscricao = (payload: IInscricaoDataReq) => {
  return api.post(`/inscricoes`, payload);
};

export default postInscricao;
