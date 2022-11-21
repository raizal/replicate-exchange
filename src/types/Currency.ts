import type { PriceChange } from '@/types/PriceChange';

export type Wallet = {
  currencyGroup: string;
  tokenSymbol: string;
  decimal_point: number;
  tokenType: string;
  blockchain: string;
  explorer: string;
  listingDate: Date;
  blockchainName: string;
  logo: string;
};

export type Currency = {
  currencyGroup: string;
  color: string;
  currencySymbol: string;
  name: string;
  logo: string;
  decimal_point: number;
  listingDate: Date;
  // wallets: Wallet[];
};

export type CurrencyPrice = Currency & {
  priceInfo: PriceChange;
};

export interface MapCurrency {
  [key: string]: Currency;
}
