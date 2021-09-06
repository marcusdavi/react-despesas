export interface IDespesa{
  id: number;
  descricao: string;
  categoria: string;
  valor: number;
  mes: string;
  dia: string
}

export interface IDespesaTableProps{
  despesas: IDespesa[];
}

export interface IDespesaHeaderProps{
  total: string
  month: string;
  year: string;
  years: string[];
}