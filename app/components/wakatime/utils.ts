export const extractHoursAndMinutes = (
  timeString: string,
): { hours: number; minutes: number } => {
  const hoursMatch = timeString.match(/([\d,]+)\s*hrs?/i);
  const minutesMatch = timeString.match(/(\d+)\s*mins?/i);

  const parseNumber = (numStr: string | undefined) => {
    if (!numStr) return 0;
    return parseInt(numStr.replace(/,/g, ''), 10);
  };

  const hours = parseNumber(hoursMatch?.[1]);
  const minutes = parseNumber(minutesMatch?.[1]);

  return { hours, minutes };
};

export const secondsToHours = (seconds: number): number => {
  const hours = seconds / 60 / 60;

  // Format to 2 decimal places
  return parseFloat(hours.toFixed(2));
};

export const formatDateToISO = (date: Date) => {
  return date.toISOString().split('T')[0];
};
