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

export const isPastDate = (date: string): boolean => new Date(date) < new Date();
export const getToday = (): string => new Date().toISOString();


export function formatRelativeTime(date?: Date | string | null): string {
  if (!date) return 'No es una fecha.';

  const d = new Date(date);
  const now = new Date();
  const diffMs = now.getTime() - d.getTime();

  if (diffMs < 0) return 'En el Futuro';

  const seconds = Math.floor(diffMs / 1000);
  if (seconds < 5) return 'Justo Ahora';
  if (seconds < 60) return `Hace ${seconds} s`;

  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `Hace ${minutes} Min`;

  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `Hace ${hours} horas`;

  const days = Math.floor(hours / 24);
  if (days < 7) return `Hace ${days} días`;

  return formatDateDDMMYYYY(d);
}