export interface IFile {
  id: number;
  fileData: File;
}
export interface ICheckbox {
  id: number;
  desc: string;
  value?: boolean;
}
export interface IInscricaoData {
  historicosGraduacao: IFile[];
  historicosPosGraduacao: IFile[];
  producoesCientificas: IFile[];
  enade: string;
  checkboxes: ICheckbox[];
}
