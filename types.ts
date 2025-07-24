export type ViewMode = 'week' | 'month' | 'year';

export interface Transaction {
  id: string;
  amount: number;
  date: Date;
  description: string;
}

export interface Goal {
  amount: number;
  deadline: string; // Storing as YYYY-MM-DD string
}
