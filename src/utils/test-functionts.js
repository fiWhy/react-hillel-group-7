export const circusName = (name) =>
  name
    .split('')
    .map((letter, index) => (!(index % 2) ? letter.toUpperCase() : letter));
export const leadingZero = (number) => ('0' + number).slice(-2);
export const formatTimer = (date) =>
  leadingZero(date.getHours()) +
  ':' +
  leadingZero(date.getMinutes()) +
  ':' +
  leadingZero(date.getSeconds());
