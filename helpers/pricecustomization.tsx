export const formatCurrency = (price: number, enableConcat = false) => {
  //{currency:'₦' , number:String(price) , attachment:'NGN'}
  if (price == 0) {
    return `₦ 0.00`;
  }
  if (price > 999999 && enableConcat) {
    if (price < 1000000000) {
      var degraded = price / 1000000;
      return `₦ ${degraded.toFixed(2)}M`;
    } else if (price < 1000000000000) {
      var degraded = price / 1000000000;
      return `₦ ${degraded.toFixed(2)}B`;
    }
  }
  if (price < 0) {
    const data = Intl.NumberFormat().format(-1 * price);
    return `-₦ ${data}`;
  }
  const data = Intl.NumberFormat().format(price);

  return `₦ ${data}`;
};
