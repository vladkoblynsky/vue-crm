import currencyFormatter from "currency-formatter";

export default function priceFilter(
  amount: number,
  currency: string
): string {

  return currencyFormatter.format(amount, {code: currency});
}