import api from "../../services/Api";
import { IDetalhes } from "./Interfaces";

const getDetalhesInscricaoProfessor = (
  inscricaoId: string | undefined,
  editalId: string | undefined,
  token: string | undefined
) => {
  return api.get<IDetalhes>(
    `/processos-seletivos/${editalId}/inscricoes/${inscricaoId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export default getDetalhesInscricaoProfessor;
