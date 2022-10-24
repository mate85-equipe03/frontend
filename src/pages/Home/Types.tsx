export interface IEtapa {
  name: string;
  data_fim: string;
}

export interface IEdital {
  id: number;
  titulo: string;
  etapas: IEtapa[];
  // inscrito?: boolean;
}

// export interface IEditalAberto {
//   id: number;
//   titulo: string;
//   etapas: IEtapa[];
//   //inscrito?: boolean;
// }

// export interface IEditalEncerrado {
//   id: number;
//   titulo: string;
//   //inscrito?: boolean;
// }

export interface IEditais {
  processos: IEdital[];
}

export interface IEditaisReq {
  editais: IEditais;
}
