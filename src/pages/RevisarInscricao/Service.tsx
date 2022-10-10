import api from "../../services/Api";
import { IDetalhes } from "./Interfaces";

const getDetalhesInscricaoProfessor = (
  inscricaoId: string,
  editalId: string
) => {
  return api.get<IDetalhes>(
    `/processos-seletivos/${editalId}/inscricoes/${inscricaoId}`
  );
};

export default getDetalhesInscricaoProfessor;
