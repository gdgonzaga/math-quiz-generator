import { getFactors } from './multiplicationEquationFactory';
import { describe } from 'vitest';
import { it } from 'vitest';
import { expect } from 'vitest';

describe('getFactors', () => {
  const range = { min: 1, max: 5 };
  const specified = [11, 12, 13, 14, 15];

  it('produces (ranged * ranged) factors within specified range', () => {
    const factors = getFactors(range, range);
    isNumberInRange(factors[0]);
    isNumberInRange(factors[1]);
  });

  it('produces (specified * specified) factors using only specified numbers', () => {
    const factors = getFactors(specified, specified);
    isNumberInSpecified(factors[0]);
    isNumberInSpecified(factors[1]);
  });

  it('produces (ranged * specified) factors with expected values', () => {
    const factors = getFactors(range, specified);
    isNumberInRange(factors[0]);
    isNumberInSpecified(factors[1]);
  });
});

function isNumberInRange(number) {
  expect([1, 2, 3, 4, 5]).toContain(number);
}

function isNumberInSpecified(number) {
  expect([11, 12, 13, 14, 15]).toContain(number);
}
