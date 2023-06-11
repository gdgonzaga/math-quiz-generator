import { getRandomNumber } from './utils';
import { isRequired } from './utils';

export function getFactors(
  factor1Options = isRequired('factor1Options'),
  factor2Options = isRequired('factor2Options')
) {
  const factor1 = getNumberFromOptions(factor1Options);
  const factor2 = getNumberFromOptions(factor2Options);

  return [factor1, factor2];

  function getNumberFromOptions(options) {
    if (Array.isArray(options)) {
      return options[getRandomNumber(0, options.length - 1)];
    } else {
      return getRandomNumber(options.min, options.max);
    }
  }
}
