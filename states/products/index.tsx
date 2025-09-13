import { ProductItem } from '@/@types/product';
import { createReStateMethods } from '@raulpesilva/re-state';

const PRODUCTS_KEY = 'products';
const initialValue: ProductItem[] = [
  {
    id: 1,
    farm_id: 1,
    name: 'Banana',
    icon: 'banana',
    color: '#FF6467',
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    id: 2,
    farm_id: 1,
    name: 'Cenoura',
    icon: 'carrot',
    color: '#FF8906',
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    id: 3,
    farm_id: 1,
    name: 'Cereja',
    icon: 'cherry',
    color: '#FEC745',
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    id: 4,
    farm_id: 2,
    name: 'Cítrico',
    icon: 'citrus',
    color: '#06DF73',
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    id: 5,
    farm_id: 2,
    name: 'Folhagem',
    icon: 'leafy',
    color: '#52A2FF',
    created_at: new Date(),
    updated_at: new Date(),
  },
];

const methods = createReStateMethods(PRODUCTS_KEY, initialValue);

export const { dispatchProducts, useProductsSelect, getProducts } = methods;
