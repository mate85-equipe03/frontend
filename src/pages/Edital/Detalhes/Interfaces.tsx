export interface IEtapa {
  id: number;
  name: string;
  data_inicio: string;
  data_fim: string;
}

export interface IDetails {
  titulo: string;
  semestre: string;
  descricao: string;
  edital_url: string;
  arquivado: boolean;
  etapas: IEtapa[];
}

export interface IInscritos {
  id: string;
  status: string;
  processo_seletivo_id: number;
  aluno_id: number;
  url_lattes: string;
  url_enade: string;
  revisor_id: number;
  auditor_id: number;
  nota_final: number;
  classificacao: number;
  createdAt: string;
  editedAt: string;
  historico: undefined[];
}
