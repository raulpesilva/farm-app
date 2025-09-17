export interface StockItem {
  id: number;
  farm_id: number;
  product_id: number;
  type: 'buy' | 'plant' | 'harvest';
  value: number;
  amount: number;
  created_at: Date;
  updated_at: Date;
}
