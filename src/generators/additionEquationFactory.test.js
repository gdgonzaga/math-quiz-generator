import { numberToDigitArray, digitArrayToNumber } from './utils';
import {
  getAddendsNoCarry,
  getAddendsWithCarry
} from './additionEquationFactory';
import { describe, it, beforeAll, expect } from 'vitest';

const MAX_SUM = 1000;
const TERM_PAIR_COUNT = 10000;

let additionNoCarryTerms = [];
let additionWithCarryTerms = [];

beforeAll(() => {
  fillTestArrays();
})

function fillTestArrays() {
  for (let i = 0; i < TERM_PAIR_COUNT; i++) {
    additionNoCarryTerms.push(getAddendsNoCarry(MAX_SUM));
    additionWithCarryTerms.push(getAddendsWithCarry(MAX_SUM));
  }
}

describe('getAddendsNoCarry', () => {
  it('returns an array of number pairs', () => {
    testArrayHasNumberPairs(additionNoCarryTerms);
  })

  it('has addend pairs that do not require carrying when added', () => {
    additionNoCarryTerms.forEach(([addend1, addend2]) => {
      const digits1 = numberToDigitArray(addend1);
      const digits2 = numberToDigitArray(addend2);

      for (let i = 0; i < digits1.length; i++) {
        if (i === digits2.length)
          break;

        const sum = digits1[i] + digits2[i];
        expect(sum).toBeLessThan(10);
      }
    })
  })
})

describe('getAddendsWithCarry', () => {
  it('returns an array of number pairs', () => {
    testArrayHasNumberPairs(additionWithCarryTerms);
  })

  it('has addend pairs that require carrying when added', () => {
    additionWithCarryTerms.forEach(([addend1, addend2]) => {
      const digits1 = numberToDigitArray(addend1);
      const digits2 = numberToDigitArray(addend2);

      let hasCarry = false;

      for (let i = 0; i < digits1.length; i++) {
        if (i === digits2.length)
          break;

        const sum = digits1[i] + digits2[i];
        if (sum >= 10)
          hasCarry = true;
      }

      expect(hasCarry).toBe(true);
    })
  })
})

function testArrayHasNumberPairs(array) {
  expect(array.length).toBeGreaterThan(0);
  array.forEach(pair => {
    expect(pair).toHaveLength(2);
    expect(pair[0]).toBeTypeOf('number');
    expect(pair[1]).toBeTypeOf('number');
  })
}
