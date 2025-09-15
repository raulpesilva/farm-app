import { StockItem } from '@/@types/stock';
import { createReStateMethods } from '@raulpesilva/re-state';

const STOCKS_KEY = 'stocks';
const initialValue: StockItem[] = [];

const methods = createReStateMethods(STOCKS_KEY, initialValue);

export const { dispatchStocks, useStocksSelect } = methods;
