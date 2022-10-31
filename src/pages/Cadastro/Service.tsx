import api from "../../services/Api";
import { IDados, ISignUpData } from "./Types";

const getDadosAluno = () => {
  return api.get<IDados>("/alunos/consultar-inscricao");
};

export default getDadosAluno;
