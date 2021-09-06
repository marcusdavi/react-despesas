export interface IExpenditure{
  id: number;
  descricao: string;
  categoria: string;
  valor: number;
  mes: string;
  dia: string
}

export interface IExpenditureTableProps{
  expenditures: IExpenditure[];
}

export interface IExpenditureHeaderProps{
  total: string
  month: string;
  year: string;
  yearsSelect: string[];
}