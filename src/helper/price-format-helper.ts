function getNumberWithCommas(number: number) {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}

export const priceFormatHelper = (price: number, currencySymbol = 'Rp') => {
  return `${currencySymbol} ${getNumberWithCommas(price)}`;
};
