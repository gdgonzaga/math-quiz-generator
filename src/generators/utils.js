export function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export function getDigit(number, place) {
  if (number < Math.pow(10, place-1))
    return null;

  const smallDigits = number % Math.pow(10, place);
  const digit = Math.floor(smallDigits / Math.pow(10, place-1));
  return digit;
}

export function numberToDigitArray(number) {
  return Array.from(String(number), Number).reverse();
}

export function digitArrayToNumber(digitArray) {
  const newArray = digitArray.slice().reverse();
  const number = newArray.reduce((total, current) => (total*10) + current);
  return number;
}

export function addCommasToNumber(number) {
  let numberAsString = String(number);
  let result = '';

  const numChunksOf3 = Math.ceil(numberAsString.length / 3);

  for (let i = 0; i <= numChunksOf3; i++) {
    const remainder = numberAsString.length % 3;
    const endIndex = (remainder === 0) ? 3 : remainder;
    const sliceString = numberAsString.slice(0, endIndex);
    numberAsString = numberAsString.slice(endIndex);
    const commaString = (i === 0 || i === numChunksOf3) ? '' : ',';
    result = result.concat(commaString, sliceString);
  }
  return result;
}

export function isRequired(argName) {
  if (argName)
    throw new Error(`Missing required argument: ${argName}`);
  else
    throw new Error(`Missing required argument`);
}
