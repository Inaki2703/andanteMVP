export function formatPrice(amount: number): string {
  const formatted = amount.toLocaleString('es-MX', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
  return `$${formatted} MXN`;
}
