import { SaleItem } from '@/@types/sale';
import { createReStateMethods } from '@raulpesilva/re-state';

const SALES_KEY = 'sales';
const initialValue: SaleItem[] = [];

const methods = createReStateMethods(SALES_KEY, initialValue);

export const { dispatchSales, useSalesSelect } = methods;
