export function getSecondsSinceDate(date: Date) {
  return Math.floor(date.getTime() / 1000);
}

export function getFortniteDate(date: Date) {
  const secondsSinceEpoch = Math.floor(date.getTime() / 1000);
  const fortniteEpoch = 1546300800; // January 1, 2019, Fortnite epoch
  const secondsInFortnite = 1209600; // 14 days in seconds
  const fortniteWeek = Math.floor((secondsSinceEpoch - fortniteEpoch) / secondsInFortnite);
  return `Fortnite Week ${fortniteWeek}`;
}
