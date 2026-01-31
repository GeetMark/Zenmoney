
export enum TransactionType {
  INCOME = 'INCOME',
  EXPENSE = 'EXPENSE'
}

export enum Category {
  FOOD = 'Food',
  TRANSPORT = 'Transport',
  HOUSING = 'Housing',
  ENTERTAINMENT = 'Entertainment',
  SHOPPING = 'Shopping',
  UTILITIES = 'Utilities',
  SALARY = 'Salary',
  INVESTMENT = 'Investment',
  OTHER = 'Other'
}

export interface Transaction {
  id: string;
  amount: number;
  category: Category;
  date: string;
  description: string;
  type: TransactionType;
}

export interface Budget {
  category: Category;
  limit: number;
}

export interface FinancialState {
  transactions: Transaction[];
  budgets: Budget[];
}

export interface AIInsight {
  title: string;
  content: string;
  severity: 'info' | 'warning' | 'positive';
}
