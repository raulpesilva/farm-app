export interface SaleItem {
  id: number;
  farm_id: number;
  product_id: number;
  type: 'buy' | 'sell';
  value: number;
  amount: number;
  date: Date;
  created_at: Date;
  updated_at: Date;
}
