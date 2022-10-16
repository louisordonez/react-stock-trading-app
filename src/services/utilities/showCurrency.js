export const showCurrency = (amount) =>
  parseFloat(amount).toLocaleString('en-US', { style: 'currency', currency: 'USD' });
