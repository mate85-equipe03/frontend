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
  nota_historico_graduacao_file: number;
  nota_historico_posgraduacao_file: number;
  nota_url_enade: number;
  id_inscricao: number | undefined;
  nota_final: number;
  observacao_professor: string;
}

export interface IInscricaoDataReq {
  historico_graduacao_file: File[];
  historico_posgraduacao_file: File[];
  url_enade: string;
  processo_seletivo_id: number;
  nota_historico_graduacao_file: number;
  nota_historico_posgraduacao_file: number;
  nota_url_enade: number;
}

export interface IProducao {
  categorias_producao_id: number;
  files: IFile[];
}
