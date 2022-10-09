export interface Aluno{
    id: number;
    userId: number;
    matricula: number;
    nome: string;
    semestre_pgcomp: number;
    curso: string;
    lattes_link: string;
}

export interface AHistorico{
    id: number;
    url: string;
    tipo: string;
    inscricao_id: number;
}

export interface ADetalhes {
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
    Historico: AHistorico[];
    aluno: Aluno[];
  }