import { getRandomNumber } from './utils';
import { isRequired } from './utils';

export function getDivisionTermsWithRemainder(
  dividendOptions = isRequired('dividendOptions'),
  divisorOptions = isRequired('divisorOptions')
) {
  const [initialDividend, divisor] = getInitialTerms(
    dividendOptions,
    divisorOptions
  );

  if (initialDividend % divisor !== 0) {
    return [initialDividend, divisor];
  } else {
    return termsWithForcedRemainder();
  }

  function termsWithForcedRemainder() {
    const dividendOptionIsRange = !Array.isArray(dividendOptions);
    let maxDividend;

    if (dividendOptionIsRange) {
      maxDividend = dividendOptions.max;
    }

    const remainder = getRandomNumber(1, divisor);
    const newBiggerDividend = initialDividend + remainder;
    if (dividendOptionIsRange && (newBiggerDividend <= maxDividend)) {
      return [newBiggerDividend, divisor];
    } else {
      const newSmallerDividend = initialDividend - divisor + remainder;
      return [newSmallerDividend, divisor]
    }
  }
}

export function getDivisionTermsNoRemainder(
  dividendOptions = isRequired('dividendOptions'),
  divisorOptions = isRequired('divisorOptions')
) {
  const [initialDividend, divisor] = getInitialTerms(
    dividendOptions,
    divisorOptions
  );

  if (initialDividend % divisor === 0) {
    return [initialDividend, divisor];
  } else {
    return termsWithForcedRemainder();
  }

  function termsWithForcedRemainder() {
    const dividendOptionIsRange = !Array.isArray(dividendOptions);
    let maxDividend;

    if (dividendOptionIsRange) {
      maxDividend = dividendOptions.max;
    }

    const remainder = initialDividend % divisor;
    const newBiggerDividend = initialDividend + divisor - remainder;
    if (dividendOptionIsRange && (newBiggerDividend <= maxDividend)) {
      return [newBiggerDividend, divisor];
    } else {
      const newSmallerDividend = initialDividend - remainder;
      return [newSmallerDividend, divisor]
    }
  }
}

function getInitialTerms(
  dividendOptions = isRequired('dividendOptions'),
  divisorOptions = isRequired('divisorOptions')
) {
  const dividend = getNumberFromOptions(dividendOptions);
  const divisor = getNumberFromOptions(divisorOptions);

  return [dividend, divisor];

  function getNumberFromOptions(options) {
    if (Array.isArray(options)) {
      return options[getRandomNumber(0, options.length - 1)];
    } else {
      return getRandomNumber(options.min, options.max);
    }
  }
}
