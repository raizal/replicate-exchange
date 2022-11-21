import http from '@/services/http';
import type { Currency } from '@/types/Currency';
import type { PriceChange } from '@/types/PriceChange';
import type { Response } from '@/types/Response';

export const getSupportedCurrencies = async (): Promise<Response<Currency>> => {
  const { data } = await http.get<Response<Currency>>(
    '/wallet/supportedCurrencies/'
  );
  return data;
};

export const getPriceChanges = async (): Promise<Response<PriceChange>> => {
  const { data } = await http.get<Response<PriceChange>>(
    '/trade/price-changes/'
  );
  return data;
};
