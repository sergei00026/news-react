export function formatDate(date: string | Date): string  {

const options: Intl.DateTimeFormatOptions= {
  weekday: "long",  // Monday
  month: "long",    // January
  day: "numeric",   // 25
  year: "numeric"   // 2021
}
  const dateObj = typeof date === 'string' ? new Date(date) : date
  return dateObj.toLocaleDateString("en-US", options);
}