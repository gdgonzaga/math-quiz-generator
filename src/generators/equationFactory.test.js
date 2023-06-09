import { getAdditionEquations } from './equationFactory';
import { getSubtractionEquations } from './equationFactory';
import { beforeAll, describe, it, expect } from 'vitest';

const NUM_PAIRS = 100;

beforeAll(() => {
  
})

describe('getAdditionEquations', () => {
  it('returns addend pairs in the specified amount', () => {
    const addends = getAdditionEquations(NUM_PAIRS, 100);
    expect(addends).toHaveLength(NUM_PAIRS);
  });
})

describe('getSubtractionEquations', () => {
  it('returns subtraction equations in the specified amount', () => {
    const subtractionTerms = getSubtractionEquations(NUM_PAIRS, 10, 1000);
    expect(subtractionTerms).toHaveLength(NUM_PAIRS);
  });
});
