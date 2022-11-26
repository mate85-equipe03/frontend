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

export interface IAluno {
  id: number;
  userId: number;
  matricula: string;
  nome: string;
  semestre_pgcomp: number;
  curso: string;
  lattes_link: string;
}

export interface IAHistorico {
  createdAt: string;
  id: number;
  url: string;
  tipo: string;
  inscricao_id: number;
}

export interface IADetalhes {
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
  Historico: IAHistorico[];
  aluno: IAluno;
  createdAt: string;
  editedAt: string;
}
