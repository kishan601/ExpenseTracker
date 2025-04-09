export interface Expense {
  id: number;
  title: string;
  price: number;
  category: string;
  date: string;
}

export interface ExpenseTrackerState {
  walletBalance: number;
  expenses: Expense[];
  totalExpenses: number;
}
