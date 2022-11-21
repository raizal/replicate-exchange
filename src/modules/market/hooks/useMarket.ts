import { useCallback, useEffect, useMemo, useState } from 'react';

import { currencyListToMapped } from '@/helper/utils';
import type { CurrencyPrice, MapCurrency } from '@/types/Currency';
import type { DateRange } from '@/types/PriceChange';

import { usePriceChanges, useSupportedCurrencies } from '../api/providers';

export const useMarket = () => {
  const [currencies, setCurrencies] = useState<MapCurrency>({});
  const [currencyPrices, setCurrencyPrices] = useState<CurrencyPrice[]>([]);

  const [dateRange, setDateRange] = useState<DateRange>('daily');

  const { isLoading: isLoadingSupportedCurrencies, data: dataCurrency } =
    useSupportedCurrencies();

  const {
    isLoading: isLoadingPriceChanges,
    data: dataPriceChanges,
    refetch,
  } = usePriceChanges();

  const switchDateRange = useCallback(
    (date: DateRange) => {
      if (date !== dateRange) {
        setDateRange(date);
      }
    },
    [dateRange]
  );

  useEffect(() => {
    if (dataCurrency?.payload && dataCurrency?.payload.length > 0) {
      setCurrencies(currencyListToMapped(dataCurrency?.payload));
    }
  }, [dataCurrency?.payload]);

  useEffect(() => {
    if (
      Object.keys(currencies).length > 0 &&
      dataPriceChanges?.payload &&
      dataPriceChanges?.payload.length > 0
    ) {
      const curPrices = dataPriceChanges?.payload.map((price) => {
        const pair = price?.pair || '';
        const cur = (pair.split('/')[0] || '').toUpperCase();
        const currency = currencies[cur];
        if (currency === undefined || currency === null) {
          return {
            currencySymbol: '',
            color: '',
            listingDate: new Date(),
            logo: '',
            decimal_point: 1,
            name: '',
            currencyGroup: '',
            priceInfo: price,
          };
        }
        return {
          ...currency,
          priceInfo: price,
        };
      });
      setCurrencyPrices(curPrices);
    }
  }, [currencies, dataPriceChanges?.payload]);

  useEffect(() => {
    const idInterval = setInterval(() => refetch(), 2500);
    return () => {
      clearInterval(idInterval);
    };
  });

  const dailyTopCrypto: CurrencyPrice[] = useMemo(() => {
    const sorted = currencyPrices.sort((x, y) => {
      const xValue = Math.abs(parseFloat(x.priceInfo.day));
      const yValue = Math.abs(parseFloat(y.priceInfo.day));
      if (xValue > yValue) {
        return -1;
      }
      if (xValue < yValue) {
        return 1;
      }
      return 0;
    });
    return sorted.slice(0, 6);
  }, [currencyPrices]);

  return {
    supportedCurrencies: dataCurrency?.payload || [],
    isLoadingSupportedCurrencies,
    isLoadingPriceChanges,
    dataPriceChanges,
    currencies,
    priceChanges: dataPriceChanges?.payload || [],
    currencyPrices,
    refetch,
    setDateRange,
    dateRange,
    switchDateRange,
    dailyTopCrypto,
  };
};
