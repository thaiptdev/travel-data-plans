export const formatPrice = (amount: number, currency: string = "USD"): string => {
  try {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency,
      minimumFractionDigits: 2,
    }).format(amount);
  } catch {
    return `${amount.toFixed(2)} ${currency}`;
  }
};

export const formatValidityDays = (days: number): string => {
  if (days === 1) return "1 day";
  if (days < 30) return `${days} days`;
  if (days % 30 === 0) return `${days / 30} month(s)`;
  return `${days} days`;
};
