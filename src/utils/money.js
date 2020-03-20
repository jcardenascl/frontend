export default function formatMoney(currency, money) {
  let formatter;

  switch (currency) {
    case 'VEF':
      formatter = new Intl.NumberFormat('es-VE', {
        style: 'currency',
        currency: 'VES',
        minimumFractionDigits: 0
      });

      return formatter.format(money);
    default:
      formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0
      });

      return formatter.format(money);
  }
}
