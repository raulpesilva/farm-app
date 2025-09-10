import { OptionSelect } from '@/components';

export interface ProductItem {
  id: number;
  farm_id: number;
  name: string;
  icon: string;
  color: string;
  created_at: Date;
  updated_at: Date;
}

export const COLORS_PRODUCT: OptionSelect[] = [
  { displayName: 'Vermelho', type: 'red', color: '#FF6467' },
  { displayName: 'Laranja', type: 'orange', color: '#FF8906' },
  { displayName: 'Amarelo', type: 'yellow', color: '#FEC745' },
  { displayName: 'Verde', type: 'green', color: '#06DF73' },
  { displayName: 'Azul', type: 'blue', color: '#52A2FF' },
  { displayName: 'Roxo', type: 'purple', color: '#A685FF' },
  { displayName: 'Rosa', type: 'pink', color: '#FEA5D5' },
  { displayName: 'Marrom', type: 'brown', color: '#D1872E' },
];

export type ColorOptionSelect = (typeof COLORS_PRODUCT)[number];

export const ICONS_PRODUCT: OptionSelect[] = [{ displayName: 'Sale', type: 'sale', icon: 'sale' }];

export type IconOptionSelect = (typeof ICONS_PRODUCT)[number];
