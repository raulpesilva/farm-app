import { ICON_MAP, OptionSelect } from '@/components';

export interface ProductItem {
  id: number;
  farm_id: number;
  name: string;
  icon: keyof typeof ICON_MAP;
  color: keyof typeof COLOR_MAP;
  created_at: Date;
  updated_at: Date;
}

export const COLOR_MAP: Record<string, string> = {
  red: '#FF6467',
  orange: '#FF8906',
  yellow: '#FEC745',
  green: '#06DF73',
  blue: '#52A2FF',
  purple: '#A685FF',
  pink: '#FEA5D5',
  brown: '#D1872E',
};

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

export const ICONS_PRODUCT: OptionSelect[] = [
  { displayName: 'Banana', type: 'banana', icon: 'banana' },
  { displayName: 'Cenoura', type: 'carrot', icon: 'carrot' },
  { displayName: 'Cereja', type: 'cherry', icon: 'cherry' },
  { displayName: 'Cítrico', type: 'citrus', icon: 'citrus' },
  { displayName: 'Folhagem', type: 'leafy', icon: 'leafy' },
  { displayName: 'Maça', type: 'apple', icon: 'apple' },
  { displayName: 'Ovo', type: 'egg', icon: 'egg' },
  { displayName: 'Semente', type: 'sprout', icon: 'sprout' },
  { displayName: 'Uva', type: 'grape', icon: 'grape' },
  { displayName: 'Vegetal', type: 'vegan', icon: 'vegan' },
];

export type IconOptionSelect = (typeof ICONS_PRODUCT)[number];
