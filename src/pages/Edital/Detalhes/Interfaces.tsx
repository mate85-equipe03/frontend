export interface IEtapa {
  id: number;
  name: string;
  data_inicio: string;
  data_fim: string;
}

export interface ICategoria{
  id: number;
  nome: string;
  pontuacao:string;
}
export interface IDetails {
  titulo: string;
  semestre: string;
  descricao: string;
  edital_url: string;
  arquivado: boolean;
  etapas: IEtapa[];
  categorias_producao: ICategoria[]
}
