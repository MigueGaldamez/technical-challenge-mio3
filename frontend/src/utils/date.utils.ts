export function formatDateDDMMYYYY(date?: Date | string | null): string {
  if (!date) return 'Sin fecha';
  const d = new Date(date);
  const day = String(d.getDate()).padStart(2, '0');
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const year = d.getFullYear();
  return `${day}/${month}/${year}`;
}

export function formatToISO(date?: Date | string | null): string {
  if (!date) return '';
  return new Date(date).toISOString();
}

export function formatToLocale(date?: Date | string | null, locale = 'es-ES'): string {
  if (!date) return 'Sin fecha';
  return new Date(date).toLocaleDateString(locale);
}