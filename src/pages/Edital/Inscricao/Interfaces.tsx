export interface IFile {
  id: number;
  fileData: File;
}

export interface ICheckbox {
  id: number;
  label: string;
  value: boolean;
}

export interface IInscricaoData {
  historico_graduacao_file: IFile[];
  historico_posgraduacao_file: IFile[];
  url_enade: string;
  processo_seletivo_id: number;
}

export interface IInscricaoDataReq {
  historico_graduacao_file: File[];
  historico_posgraduacao_file: File[];
  url_enade: string;
  processo_seletivo_id: number;
}

export interface IProducao {
  categorias_producao_id: number;
  files: IFile[];
}


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
  filename: string;
  categorias_producao: {
    id: number;
    nome: string;
    pontuacao: number;
    processo_seletivo_id: number;
  };
}
export interface IAluno {
  id: number;
  userId: number;
  matricula: number;
  nome: string;
  semestre_pgcomp: number;
  curso: string;
  lattes_link: string;
}

export interface IEditInscricao {
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
  aluno: IAluno;
  producoes: IProducoes[];
}
