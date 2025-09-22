import { Sale } from '@/@types/transactions';
import { createReStateMethods } from '@raulpesilva/re-state';

const SALES_KEY = 'sales';
const initialValue: Sale[] = [];

const methods = createReStateMethods(SALES_KEY, initialValue);

export const { dispatchSales, useSalesSelect, resetSales } = methods;
