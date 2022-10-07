export interface ISignUpData {
  // pendente incluir "nome" no back
  // "matricula" e "login" duplicados, possuem mesmo valor.
  login: string;
  matricula: string;
  senha: string;
  confirmacaoSenha: string;
  semestre_pgcomp: number | string;
  curso: string;
  lattes_link: string;
  email: string;
  telefone: string;
}
