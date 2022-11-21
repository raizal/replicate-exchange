import type { Currency, MapCurrency } from '@/types/Currency';

export const currencyListToMapped = (currencies: Currency[]): MapCurrency => {
  const result: MapCurrency = {};
  currencies.forEach((currency) => {
    result[currency.currencySymbol] = currency;
  });
  return result;
};
