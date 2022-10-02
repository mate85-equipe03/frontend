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
  historico_graduacao: IFile[];
  historico_posgraduacao: IFile[];
  producoes_cientificas: IFile[];
  url_enade: string;
  // url_lattes: string;
  checkboxes: ICheckbox[];
}

export interface IPropsAttachInput {
  inputName: string;
  label: string;
  files: IFile[];
  setFiles: (files: IFile[]) => void;
}

export interface IPropsAttachFile {
  fileKey: number;
  fileName: string;
  deleteFile: (index: number) => void;
}
