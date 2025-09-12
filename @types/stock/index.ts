export interface StockItem {
  id: number;
  product_id: number;
  product_name: string;
  quantity: number;
  type: 'bought' | 'planted' | 'harvested'; // comprado, plantado, colhidoI
  created_at: Date;
  updated_at: Date;
}
