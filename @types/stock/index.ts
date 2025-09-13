export interface StockItem {
  id: number;
  product_id: number;
  quantity: number;
  type: 'bought' | 'planted' | 'harvested'; // comprado, plantado, colhidoI
  created_at: Date;
  updated_at: Date;
}
