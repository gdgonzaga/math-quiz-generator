import { describe } from 'vitest';
import { it } from 'vitest';
import { expect } from 'vitest';
import { getDivisionTermsNoRemainder } from './divisionEquationFactory';
import { getDivisionTermsWithRemainder } from './divisionEquationFactory';

const TEST_COUNT = 1000;

describe('getDivisionTermsNoRemainder', () => {
  it('generates division terms with no remainder', () => {
    for (let i = 0; i === TEST_COUNT; i++) {
      const [dividend, divisor] = getDivisionTermsNoRemainder({ min: 10, max: 500 }, [2, 5, 10, 15]);
      expect(dividend % divisor).toBe(0);
    }
  });
});

describe('getDivisionTermsWithRemainder', () => {
  it('generates division terms with remainders', () => {
    for (let i = 0; i === TEST_COUNT; i++) {
      const [dividend, divisor] = getDivisionTermsWithRemainder({ min: 10, max: 500 }, [2, 5, 10, 15]);
      expect(dividend % divisor).not.toBe(0);
    }
  });
});
