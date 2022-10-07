export interface IEtapa {
  id: number;
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

export interface EnhancedTableToolbarProps {
  numSelected: number;
}

export interface Data {
  nome: string;
  curso: string;
  semestreIngresso: string;
}

export interface HeadCell {
  id: keyof Data;
  label: string;
  numeric: boolean;
}

export interface EnhancedTableProps {
  numSelected: number;
  onRequestSort: (
    event: React.MouseEvent<HTMLElement>,
    property: keyof Data
  ) => void;
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  order: Order;
  orderBy: string;
  rowCount: number;
}
