export interface IExpenditure {
  id: number;
  description: string;
  category: string;
  totalValue: number;
  monthYear: string;
  day: string;
}

export interface IExpenditureTableProps {
  expenditures: IExpenditure[];
}

export interface IExpenditureHeaderProps {
  total: string;
  month: string;
  year: string;
  yearsSelect: string[];
}

export interface IUser {
  name: string;
  email: string;
}

export interface ILoginPageProps {
  onSignIn: (user: IUser) => void;
}

export interface IAuthContext {
  user: IUser;
  onSignOut: () => void;
}
