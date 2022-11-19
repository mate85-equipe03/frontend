import api from "../../../services/Api";
import { IEditInscricao, IInscricaoDataReq } from "./Interfaces";

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
  formData.append("nota_enade", payload.nota_url_enade.toString());
  return api.post("/inscricoes", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const patchInscricao = (payload: IInscricaoDataReq) => {
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
  formData.append("nota_enade", payload.nota_url_enade.toString());
  formData.append(
    "nota_historico_graduacao",
    payload.nota_historico_graduacao_file.toString()
  );
  formData.append(
    "nota_historico_posgraduacao",
    payload.nota_historico_posgraduacao_file.toString()
  );
  return api.patch("/inscricoes", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const getDadosInscricao = (editalID: number) => {
  return api.get<IEditInscricao>(`/processos-seletivos/${editalID}/inscricao`);
};
