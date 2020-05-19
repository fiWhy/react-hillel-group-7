export const leadingZero = (number) => ('0' + number).slice(-2);
export const formatTimer = (date) =>
  leadingZero(date.getHours()) +
  ':' +
  leadingZero(date.getMinutes()) +
  ':' +
  leadingZero(date.getSeconds());
