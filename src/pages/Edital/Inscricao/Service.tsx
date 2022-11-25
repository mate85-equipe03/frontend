import api from "../../../services/Api";
import { IInscricaoDataReq } from "./Interfaces";

const formData = (payload: IInscricaoDataReq) => {
  const data = new FormData();
  payload.historico_graduacao_file.forEach((file) => {
    data.append("historico_graduacao_file", file);
  });
  payload.historico_posgraduacao_file.forEach((file) => {
    data.append("historico_posgraduacao_file", file);
  });
  data.append("url_enade", payload.url_enade);
  data.append("processo_seletivo_id", payload.processo_seletivo_id.toString());
  data.append("nota_enade", payload.nota_url_enade.toString());
  data.append(
    "nota_historico_graduacao",
    payload.nota_historico_graduacao_file.toString()
  );
  data.append(
    "nota_historico_posgraduacao",
    payload.nota_historico_posgraduacao_file.toString()
  );
  return data;
};

export const postInscricao = (payload: IInscricaoDataReq) => {
  const reqData = formData(payload);
  return api.post("/inscricoes", reqData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const patchInscricao = (payload: IInscricaoDataReq) => {
  const reqData = formData(payload);
  return api.patch("/inscricoes", reqData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};