import api from "../../../services/Api";
import { IInscricaoDataReq, IProducao } from "./Interfaces";

export const postInscricao = (payload: IInscricaoDataReq) => {
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

export const postProducao = (payload: IProducao) => {
  const formData = new FormData();
  payload.files.forEach((file) => {
    formData.append("files", file.fileData);
  });
  formData.append(
    "categorias_producao_id",
    payload.categorias_producao_id.toString()
  );
  return api.post(`/inscricoes/${1}/producoes`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};
