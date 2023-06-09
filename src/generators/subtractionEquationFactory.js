import { getRandomNumber, numberToDigitArray, digitArrayToNumber } from "./utils";

export function getSubtractionTermsNoBorrow(minMinuend, maxMinuend) {
  const minuend = getRandomNumber(minMinuend, maxMinuend);
  const minuendDigitArray = numberToDigitArray(minuend);
  const subtrahendDigitArray = [];

  for (let i = 0; i < minuendDigitArray.length; i++) {
    subtrahendDigitArray[i] = getRandomNumber(0, minuendDigitArray[i]);
  }

  const subtrahend = digitArrayToNumber(subtrahendDigitArray);
  return [minuend, subtrahend];
}

export function getSubtractionTermsWithBorrow(maxMinuend) {
  let minuend = getRandomNumber(10, maxMinuend);
  const minuendDigitArray = numberToDigitArray(minuend);
  let hasBorrow = false;
  const subtrahendDigitArray = [];

  for (let i = 0; i < minuendDigitArray.length; i++) {
    assignSubtrahendDigit(i);
  }

  let subtrahend = digitArrayToNumber(subtrahendDigitArray);

  if (!hasBorrow)
    forceBorrowOnFirstDigit();

  if (minuend - subtrahend < 0)
    forcePositiveDifference();

  return [minuend, subtrahend];

  function assignSubtrahendDigit(index) {
    const minuendDigit = minuendDigitArray[index];
    let makeBorrow;
    if (getRandomNumber(0, 1) === 1)
      makeBorrow = true;
    else
      makeBorrow = false;

    if (makeBorrow
         && minuendDigit < 9
         && index !== minuendDigitArray.length-1) {
      subtrahendDigitArray[index] = getRandomNumber(minuendDigit + 1, 9);
      hasBorrow = true;
    } else {
      subtrahendDigitArray[index] = getRandomNumber(0, minuendDigit);
    }
  }

  function forceBorrowOnFirstDigit() {
    const newMinuedDigit = getRandomNumber(0, 8);
    const newSubtrahendDigit = getRandomNumber(newMinuedDigit+1, 9);

    minuendDigitArray[0] = newMinuedDigit;
    subtrahendDigitArray[0] = newSubtrahendDigit;

    minuend = digitArrayToNumber(minuendDigitArray);
    subtrahend = digitArrayToNumber(subtrahendDigitArray);
  }

  function forcePositiveDifference() {
    while (minuend - subtrahend < 0) {
      tryAdd1ToMinuendLastDigit();
      if (minuend - subtrahend < 0)
        trySubtract1FromSubrahendLastDigit();
    }

    function tryAdd1ToMinuendLastDigit() {
      const minuendDigits = numberToDigitArray(minuend);
      const lastIndex = minuendDigits.length - 1;

      if (minuendDigits[lastIndex] < 9)
        minuendDigits[lastIndex]++;

      minuend = digitArrayToNumber(minuendDigits);
    }

    function trySubtract1FromSubrahendLastDigit() {
      const subtrahendDigits = numberToDigitArray(subtrahend);
      const lastIndex = subtrahendDigits.length - 1;

      if (subtrahendDigits[lastIndex] > 0)
        subtrahendDigits[lastIndex]--;

      subtrahend = digitArrayToNumber(subtrahendDigits);
    }
  }

}
