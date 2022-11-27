import axios from "axios";
import {
  IDados,
  IEditaisReq,
  IInscricaoDataReq,
  IEdital,
  IADetalhes,
  IDetalhesInscricao,
  IRevisarAuditar,
  IEtapa,
  ISignUpDataTeacher,
  ICadastroEdital,
} from "../interfaces/Interfaces";

const api = axios.create({
  baseURL: "https://radiant-cliffs-95153.herokuapp.com",
});

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

export const getDetailsProcessoSeletivo = (
  editalId: number | string | undefined
) => {
  return api.get<IEdital>(`/processos-seletivos/${editalId}`);
};

export const getEtapaAtualProcessoSeletivo = (editalId: number) => {
  return api.get<IEtapa>(`/processos-seletivos/${editalId}/etapa-atual`);
};

export const getAllProcessosSeletivos = () => {
  return api.get<IEditaisReq>("/processos-seletivos");
};

export const getDadosAluno = () => {
  return api.get<IDados>("/alunos/consultar-inscricao");
};

export const getDetalhesInscricaoAluno = (editalId: number) => {
  return api.get<IDetalhesInscricao>(
    `/processos-seletivos/${editalId}/inscricao`
  );
};

export const getDetalhesInscricaoProfessor = (
  inscricaoId: number,
  editalId: number
) => {
  return api.get<IDetalhesInscricao>(
    `/processos-seletivos/${editalId}/inscricoes/${inscricaoId}`
  );
};

export const getEnrolledList = (editalId: string) => {
  return api.get<IADetalhes[]>(`/processos-seletivos/${editalId}/inscricoes`);
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

export const patchRevisarInscricao = (payload: IRevisarAuditar) => {
  return api.patch("/inscricoes/revisa-inscricao", payload);
};

export const patchAuditarInscricao = (payload: IRevisarAuditar) => {
  return api.patch("/inscricoes/audita-inscricao", payload);
};

export const deleteInscricao = (inscricaoId: number) => {
  return api.delete(`/inscricoes/${inscricaoId}`);
};

export const postCadastroTeacher = (signUpData: ISignUpDataTeacher) => {
  return api.post("/professores", signUpData);
};

export const postNovoEdital = (editalData: ICadastroEdital) => {
  return api.post("/processos-seletivos", editalData);
};

export default api;
