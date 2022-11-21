export type PriceChange = {
  pair: string;
  latestPrice: string;
  day: string;
  week: string;
  month: string;
  year: string;
};

export type DateRange = 'daily' | 'weekly' | 'monthly' | 'yearly';
