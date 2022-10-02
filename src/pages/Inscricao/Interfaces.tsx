export interface IFile {
  id: number;
  fileData: File;
}

export interface ICheckbox {
  id: number;
  label: string;
  value: boolean;
}

export interface ICategorias {
  id: number;
  nome: string;
  pontuacao: string;
}
export interface IProducaoCientifica {
  categoria_producao_id: number;
  url?: string;
  id: number;
  fileData: File;
}
export interface IInscricaoData {
  historico_graduacao: IFile[];
  historico_posgraduacao: IFile[];
  producoes_cientificas: IProducaoCientifica[];
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

export interface IPropsProducoesInput{
  inputName: string;
  label: string;
  categorias?: ICategorias;
  producoes: IProducaoCientifica[];
  setProducoes: (producoes: IProducaoCientifica[]) => void;
}