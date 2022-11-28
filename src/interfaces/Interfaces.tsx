import { Dayjs } from "dayjs";

export interface IUserContext {
  id: number;
  token: string;
  username: string;
  role: string;
  email: string;
  telefone: string;
  nome: string;
  matricula: string;
  professor_id: number;
}

export interface IPropsUserContext {
  user: IUserContext | null;
  setUser: React.Dispatch<React.SetStateAction<IUserContext | null>>;
}

export interface IPropsContextProvider {
  children: React.ReactNode;
}

export interface IEtapa {
  id: number;
  processo_seletivo_id: number;
  name: string;
  data_inicio: string;
  data_fim: string;
}

export interface ICategoria {
  id: number;
  nome: string;
  pontuacao: string;
}

export interface IEdital {
  id: number;
  titulo: string;
  semestre: string;
  descricao: string;
  edital_url: string;
  arquivado: boolean;
  etapas: IEtapa[];
  isInscrito: boolean;
  idInscricao: number;
  categorias_producao: ICategoria[];
  etapa_atual?: IEtapa;
}

export interface IEditais {
  processos: IEdital[];
}

export interface IEtapas {
  etapas: IEtapa[];
}

export interface IEditaisReq {
  editais: IEditais;
  etapas_atuais: IEtapas;
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

export interface IRevisor {
  id: number;
  userId: number;
  siape: number;
  nome: string;
}

export interface IAuditor {
  id: number;
  userId: number;
  siape: number;
  nome: string;
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
  revisor: IRevisor;
  auditor: IAuditor;
}

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
  nota_historico_graduacao_file: number;
  nota_historico_posgraduacao_file: number;
  nota_url_enade: number;
  id_inscricao: number | undefined;
  nota_final: number;
  observacao_professor: string;
}

export interface IInscricaoDataReq {
  historico_graduacao_file: File[];
  historico_posgraduacao_file: File[];
  url_enade: string;
  processo_seletivo_id: number;
  nota_historico_graduacao_file: number;
  nota_historico_posgraduacao_file: number;
  nota_url_enade: number;
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
  filename: string;
  nota: number;
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

export interface IDetalhesInscricao {
  id: number;
  status: string;
  processo_seletivo_id: number;
  aluno_id: number;
  url_lattes: string;
  url_enade: string;
  revisor_id: number;
  auditor_id: number;
  nota_enade: number;
  nota_final: number;
  classificacao: number;
  Historico: IHistorico[];
  aluno: IAluno;
  producoes: IProducoes[];
  observacao: string;
  revisor: string;
  auditor: string;
}

export interface IRevisarAuditar {
  id: number | undefined;
  nota_final: number;
  observacao: string;
}

export interface ISignUpData {
  nome: string;
  login: string;
  matricula: string;
  senha: string;
  confirmacaoSenha: string;
  semestre_pgcomp: string;
  curso: string;
  lattes_link: string;
  email: string;
  telefone: string;
}

export interface ISignUpDataTeacher {
  nome: string;
  login: string;
  siape: string;
  senha: string;
  confirmacaoSenha: string;
  email: string;
  telefone: string;
}

export interface IDados {
  aluno: IAluno;
  email: string;
  telefone: string;
}

export interface ILoginData {
  username: string;
  password: string;
}

export interface IUserBackend {
  id: number;
  role: string;
  email: string;
  telefone: string;
  nome: string;
  matricula: string;
  professor_id: number;
}

export interface IRecoverData {
  matricula: string;
}

export interface ICadastroEdital {
  titulo: string;
  descricao: string;
  semestre: string;
  edital_url: string;
  etapa_inscricao_inicio: string;
  etapa_inscricao_fim: string;
  etapa_analise_inicio: string;
  etapa_analise_fim: string;
  etapa_resultado_inicio: string;
  etapa_resultado_fim: string;
}

export interface IDatasEtapas {
  etapa_inscricao_inicio: Dayjs | null;
  etapa_inscricao_fim: Dayjs | null;
  etapa_analise_inicio: Dayjs | null;
  etapa_analise_fim: Dayjs | null;
  etapa_resultado_inicio: Dayjs | null;
  etapa_resultado_fim: Dayjs | null;
}
