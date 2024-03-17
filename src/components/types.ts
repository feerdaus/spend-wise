export interface Category {
  id: string;
  name: string;
  userId: string;
  allocatedAmount: number;
  createdAt: Date;
  updatedAt: Date;
  expenses?: number;
}
