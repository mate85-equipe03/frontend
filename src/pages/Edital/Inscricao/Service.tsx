import api from "../../../services/Api";
import { IInscricaoDataReq } from "./Interfaces";

const postInscricao = (payload: IInscricaoDataReq) => {
  const formData = new FormData();
  payload.historico_graduacao_file.forEach((file) => {
    formData.append("historico_graduacao_file", file);
  });
  payload.historico_posgraduacao_file.forEach((file) => {
    formData.append("historico_posgraduacao_file", file);
  });
  formData.append("url_enade", payload.url_enade);
  formData.append(
    "processo_seletivo_id",
    payload.processo_seletivo_id.toString()
  );
  return api.post("/inscricoes", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export default postInscricao;
