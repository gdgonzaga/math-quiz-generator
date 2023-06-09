import {
  getRandomNumber,
  numberToDigitArray,
  digitArrayToNumber,
} from './utils.js';

/**
 * Returns a 2-element array with random addends that do not require carrying
 * when added.
 * @param {number} maxSum largest possible sum.
 * @returns {Array} addends as a 2-element array
 */
export function getAddendsNoCarry(maxSum) {
  const sum = getRandomNumber(0, maxSum);
  const addend1 = getRandomNumber(0, sum);
  const addend2 = sum - addend1;

  const addend1Digits = numberToDigitArray(addend1)
  const addend2Digits = numberToDigitArray(addend2)

  for (let place = 0; true; place++) {
    if (place === addend1Digits.length || place === addend2Digits.length)
      break;

    let digit1 = addend1Digits[place];
    let digit2 = addend2Digits[place];

    while (digit1 + digit2 >= 10) {
      digit1--;
      if (digit1 + digit2 < 10)
        break;
      else
        digit2--;

      if (digit1 + digit2 < 10)
        break;
    }

    addend1Digits[place] = digit1;
    addend2Digits[place] = digit2;
  }

  const addends = [];
  addends.push(digitArrayToNumber(addend1Digits));
  addends.push(digitArrayToNumber(addend2Digits));

  return addends;
}

/**
 * Returns a 2-element array with random addends that require carrying
 * when added.
 * @param {number} maxSum largest possible sum.
 * @returns {Array} addends as a 2-element array
 */
export function getAddendsWithCarry(maxSum) {
  const sum = getRandomNumber(0, maxSum);
  let addend1 = getRandomNumber(0, sum);
  let addend2 = sum - addend1;


  if (!hasCarry(addend1, addend2)) {
    const addendsWithCarry = addCarryToRandomDigit(addend1, addend2);
    addend1 = addendsWithCarry[0];
    addend2 = addendsWithCarry[1];
  }

  return [addend1, addend2];

  function hasCarry(addend1, addend2) {
    const addend1Digits = numberToDigitArray(addend1)
    const addend2Digits = numberToDigitArray(addend2)
    let hasCarry = false;

    for (let place = 0; true; place++) {
      if (place === addend1Digits.length || place === addend2Digits.length)
        break;

      let digit1 = addend1Digits[place];
      let digit2 = addend2Digits[place];

      if (digit1 + digit2 >= 10)
        hasCarry = true;
    }

    return hasCarry;
  }

  function addCarryToRandomDigit(addend1, addend2) {
    const addend1Digits = numberToDigitArray(addend1)
    const addend2Digits = numberToDigitArray(addend2)

    const maxCommonIndex = Math.min(addend1Digits.length - 1, addend2Digits.length - 1);
    const maxPossiblePlaceToMakeCarry =
      (addend1Digits.length === 1 || addend2Digits.length === 1) ? 0 : maxCommonIndex - 1;
    const placeToMakeCarry = getRandomNumber(0, maxPossiblePlaceToMakeCarry);

    const targetSum = getRandomNumber(10, 18);
    const floorDiv2 = Math.floor(targetSum / 2);
    const diffFrom9 = 9 - floorDiv2;
    const digit1 = floorDiv2 + getRandomNumber(0, diffFrom9);
    const digit2 = targetSum - digit1;

    addend1Digits[placeToMakeCarry] = digit1;
    addend2Digits[placeToMakeCarry] = digit2;
    const a1 = digitArrayToNumber(addend1Digits);
    const a2 = digitArrayToNumber(addend2Digits);
    return [a1, a2];
  }
}
