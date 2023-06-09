import {
  getRandomNumber,
  getDigit,
  numberToDigitArray,
  digitArrayToNumber,
} from './utils';
import { beforeAll, it, describe, expect } from 'vitest';

const min = 2;
const max = 5;
const randomNumbers = [];
const testNumberCount = 20;

beforeAll(() => {
  for (var i = 0; i <= testNumberCount; i++) {
    randomNumbers.push(getRandomNumber(min, max));
  }
});

describe('getRandomNumber()', () => {
  it('random numbers do not go beyond min and max arguments', () => {
    randomNumbers.forEach((number) => {
      expect(number).toBeLessThanOrEqual(max);
      expect(number).toBeGreaterThanOrEqual(min);
    })
  })

  it('includes min and max arguments', () => {
    expect(randomNumbers).toContain(min);
    expect(randomNumbers).toContain(max);
  })
});

describe('getDigit()', () => {
  it('returns correct digits in a 5-digit test number', () => {
    const number = 54321;
    expect(getDigit(number, 1)).toBe(1);
    expect(getDigit(number, 2)).toBe(2);
    expect(getDigit(number, 3)).toBe(3);
    expect(getDigit(number, 4)).toBe(4);
    expect(getDigit(number, 5)).toBe(5);
  })

  it('returns null if place does not exist in the number', () => {
    const number = 54321;
    expect(getDigit(number, 6)).toBeNull();
  })

})

describe('numberToDigitArray()', () => {
  it('returns the number argument as an array of numbers with the ones place in index 0', () => {
    const number = 54321;
    const result = numberToDigitArray(number);
    expect(result).toEqual([1, 2, 3, 4, 5]);
  })
})

describe('digitArrayToNumber()', () => {
  it('returns a number from a digit array with element 0 ', () => {
    const digitArray = [1, 2, 3, 4, 5];
    const result = digitArrayToNumber(digitArray);
    expect(result).toBe(54321);
  });
});
