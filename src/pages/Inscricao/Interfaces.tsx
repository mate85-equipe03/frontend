export interface IFile {
  id: number;
  fileData: File;
}

export interface IInscricaoData {
  historicosGraduacao: IFile[];
  historicosPosGraduacao: IFile[];
  producoesCientificas: IFile[];
  enade: string;
  checkboxes: boolean[];
}
