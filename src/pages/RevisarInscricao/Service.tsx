import api from "../../services/Api";
import { ADetalhes } from "./Interfaces";

const getDetalhesInscricaoProfessor = (inscricaoId: string | undefined, editalId:string | undefined, token: string | undefined) => {
  return api.get<ADetalhes>(`/processos-seletivos/${editalId}/inscricoes/${inscricaoId}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }}
    );
};

export default getDetalhesInscricaoProfessor;