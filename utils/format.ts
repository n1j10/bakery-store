// Arabic (Iraq) formatting with Latin digits, e.g. "35,000 د.ع.‏"
const LOCALE = 'ar-IQ-u-nu-latn';

export const formatCurrency = (amount: number | null) => {
  const value = amount || 0;

  return new Intl.NumberFormat(LOCALE, {
    style: 'currency',
    currency: 'IQD',
    maximumFractionDigits: 0,
  }).format(value)
}

// The backend sends dates as ISO strings
export const formatDate = (date: Date | string) => {
  return new Intl.DateTimeFormat(LOCALE, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(date));
};

export const formatTime = (date: Date | string) => {
  return new Intl.DateTimeFormat(LOCALE, {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
    timeZone: 'Asia/Baghdad',
  }).format(new Date(date));
};
