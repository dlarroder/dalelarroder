export function subtractOneYear(date: number | string | Date) {
  const newDate = new Date(date); // Clone the input date
  newDate.setFullYear(newDate.getFullYear() - 1); // Subtract one year
  return newDate;
}

export function formatDateString(date: Date) {
  return new Date(date).toISOString().split('T')[0];
}
