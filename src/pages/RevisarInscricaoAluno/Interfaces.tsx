export interface IHistorico {
  id: number;
  url: string;
  tipo: string;
  inscricao_id: number;
}
export interface IProducoes {
  id: number;
  inscricao_id: number;
  categorias_producao_id: number;
  url: string;
}
export interface IDetalhes {
  id: number;
  status: string;
  processo_seletivo_id: number;
  aluno_id: number;
  url_lattes: string;
  url_enade: string;
  revisor_id: number;
  auditor_id: number;
  nota_final: number;
  classificacao: number;
  Historico: IHistorico[];
  producoes: IProducoes[];
}
