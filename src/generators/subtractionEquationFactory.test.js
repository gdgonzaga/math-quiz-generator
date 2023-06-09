import { getSubtractionTermsNoBorrow, getSubtractionTermsWithBorrow } from './subtractionEquationFactory';
import { beforeAll, describe, it, expect } from 'vitest';
import { digitArrayToNumber, numberToDigitArray } from './utils';

const MIN_MINUEND = 1;
const MAX_MINUEND = 1000;
const MAX_TEST_PAIRS = 500;

let testArrayNoBorrow = [];
let testArrayWithBorrow = [];

beforeAll(() => {
  fillTestArrays();
})

function fillTestArrays() {
  for (let i = 0; i < MAX_TEST_PAIRS; i++) {
    testArrayNoBorrow[i] = getSubtractionTermsNoBorrow(MIN_MINUEND, MAX_MINUEND);
    testArrayWithBorrow[i] = getSubtractionTermsWithBorrow(MAX_MINUEND);
  }
}

describe('getSubtractionTermsNoBorrow', () => {
  it('returns a 2-element array', () => {
    testArrayNoBorrow.forEach(terms => {
      expect(terms.length).toBe(2);
    })
  })

  it('produces terms that do not require borrowing', () => {
    testArrayNoBorrow.forEach(([minuend, subtrahend]) => {
      expect(minuend).toBeGreaterThanOrEqual(subtrahend);
    })
  })
})

describe('getSubtractionTermsWithBorrow', () => {
  it('returns a 2-element array', () => {
    testArrayWithBorrow.forEach(terms => {
      expect(terms.length).toBe(2);
    })
  })

  it('produces terms that require borrowing', () => {
    testArrayWithBorrow.forEach(([minuend, subtrahend]) => {
      let hasBorrow = false;
      const minuendDigits = numberToDigitArray(minuend);
      const subtrahendDigits = numberToDigitArray(subtrahend);

      for (let i = 0; i < minuendDigits.length; i++) {
        if (typeof subtrahendDigits[i] !== 'undefined'
            && subtrahendDigits[i] > minuendDigits[i])
          hasBorrow = true;
      }
      expect(hasBorrow).toBe(true);
    })
  })
})
