import type { UseQueryResult } from 'react-query';
import { useQuery } from 'react-query';

import {
  getPriceChanges,
  getSupportedCurrencies,
} from '@/modules/market/api/requests';
import type { Currency } from '@/types/Currency';
import type { PriceChange } from '@/types/PriceChange';
import type { Response } from '@/types/Response';

export const useSupportedCurrencies = (): UseQueryResult<Response<Currency>> =>
  useQuery(['market-supported-currencies'], getSupportedCurrencies);

export const usePriceChanges = (): UseQueryResult<Response<PriceChange>> =>
  useQuery(['market-price-changes'], getPriceChanges, {
    cacheTime: 0,
  });
