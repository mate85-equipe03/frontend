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
  historico_graduacao_file: IFile[];
  historico_posgraduacao_file: IFile[];
  url_enade: string;
  processo_seletivo_id: number;
}

export interface IInscricaoDataReq {
  historico_graduacao_file: File[];
  historico_posgraduacao_file: File[];
  url_enade: string;
  processo_seletivo_id: number;
}

export interface IProducao {
  categortias_producao_id: number;
  files: IFile[] ;
}
