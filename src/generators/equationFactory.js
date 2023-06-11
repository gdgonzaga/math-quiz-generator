import {
  getAddendsNoCarry,
  getAddendsWithCarry
} from './additionEquationFactory';

import {
  getSubtractionTermsNoBorrow,
  getSubtractionTermsWithBorrow
} from './subtractionEquationFactory';

import { getFactors } from './multiplicationEquationFactory';

import { getRandomNumber } from './utils';

/**
 * Make addition equations.
 * @param {number} numItems how many addend pairs to make
 * @param {number} maxSum maximum sum
 * @param {Object} options includeCarry, includeNoCarry
 * @return {Array} array of addend pairs
 */
export function getAdditionEquations(numItems, maxSum, options = {}) {
  let includeCarry = false;
  if (options.hasOwnProperty('includeCarry'))
    includeCarry = options.includeCarry;

  let includeNoCarry = false;
  if (options.hasOwnProperty('includeNoCarry'))
    includeNoCarry = options.includeNoCarry;

  const addends = [];

  for (let i = 0; i < numItems; i++) {
    if (includeNoCarry && includeCarry) {
      addRandom();
    } else if (includeCarry) {
      addCarry()
    } else {
      addNoCarry()
    }
  }

  return addends;

  function addRandom() {
    if (getRandomNumber(0, 1) === 0)
      addNoCarry()
    else
      addCarry()
  }

  function addNoCarry() {
    addends.push(getAddendsNoCarry(maxSum))
  }

  function addCarry() {
    addends.push(getAddendsWithCarry(maxSum))
  }

}

/**
 * Make subtraction equations.
 * @param {number} numItems how many addend pairs to make
 * @param {number} minMinuend minimum minuend
 * @param {number} maxMinuend maximum minuend
 * @param {Object} options includeBorrow, includeNoBorrow
 * @return {Array} array of term pairs
 */
export function getSubtractionEquations(numItems, minMinuend, maxMinuend, options = {}) {
  let includeBorrow = false;
  if (options.hasOwnProperty('includeBorrow'))
    includeBorrow = options.includeBorrow;

  let includeNoBorrow = false;
  if (options.hasOwnProperty('includeNoBorrow'))
    includeNoBorrow = options.includeNoBorrow;

  const terms = [];

  for (let i = 0; i < numItems; i++) {
    if (includeNoBorrow && includeBorrow) {
      addRandom();
    } else if (includeBorrow) {
      addBorrow()
    } else {
      addNoBorrow()
    }
  }

  return terms;

  function addRandom() {
    if (getRandomNumber(0, 1) === 0)
      addNoBorrow()
    else
      addBorrow()
  }

  function addNoBorrow() {
    terms.push(getSubtractionTermsNoBorrow(minMinuend, maxMinuend))
  }

  function addBorrow() {
    terms.push(getSubtractionTermsWithBorrow(maxMinuend))
  }
}

export function getMultiplicationEquations(numItems, factor1Options, factor2Options) {
  let factors = [];

  for (let i = 0; i < numItems; i++) {
    factors.push(getFactors(factor1Options, factor2Options))
  }

  return factors;
}
