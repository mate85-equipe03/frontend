export interface ISignUpData {
  // "matricula" e "login" duplicados, possuem mesmo valor.
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
