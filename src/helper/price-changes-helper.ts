interface Props {
  dateRange: 'daily' | 'weekly' | 'monthly' | 'yearly';
  day?: string;
  week?: string;
  month?: string;
  year?: string;
}

export const priceChangesHelper = ({
  day,
  month,
  week,
  year,
  dateRange,
}: Props): number => {
  switch (dateRange) {
    case 'daily':
      return parseFloat(day || '0');
    case 'weekly':
      return parseFloat(week || '0');
    case 'monthly':
      return parseFloat(month || '0');
    case 'yearly':
      return parseFloat(year || '0');
    default:
      return 0;
  }
};
