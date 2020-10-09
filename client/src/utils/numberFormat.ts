export const numberFormat = (
  num: number,
  locales: string = 'en-US',
  currency: string = 'USD',
  style: string = 'currency'
) => {
  return new Intl.NumberFormat(locales, {
    style,
    currency,
  }).format(num);
};
