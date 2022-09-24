export interface IEtapa {
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
