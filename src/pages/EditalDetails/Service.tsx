import api from "../../services/Api";
import { IDetails } from "./Types";

const getDetailsProcessoSeletivo = () => {
  return api.get<IDetails>("/processos-seletivos/1"); // Colocar para pegar o id do que foi clicado
};

export default getDetailsProcessoSeletivo;
