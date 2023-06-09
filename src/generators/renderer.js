import { addCommasToNumber } from "./utils.js";

export function formatPlain(termPairs, symbol, alignRight = false) {
  let longestLineLength = 0;
  let lines = [];
  termPairs.forEach(termPair => {
    const termLength = getTermLength(termPair);
    const commaLength = Math.floor(termLength / 3);
    const symbolLength = symbol.length + 1; // +1 for space

    const totalLength = termLength + commaLength + symbolLength;
    if (alignRight && totalLength > longestLineLength) {
      longestLineLength = totalLength;
    }

    const term1WithCommas = addCommasToNumber(termPair[0]);
    const term2WithCommas = addCommasToNumber(termPair[1]);

    const line1 = term1WithCommas.padStart(totalLength, ' ');
    const line2 = symbol.concat(
      ' ',
      term2WithCommas.padStart(totalLength - symbolLength, ' ')
    )
    const line3 = ''.padStart(totalLength, '—');

    //const currentEquation = (`${line1}\n${line2}\n${line3}\n\n`)
    //str = str.concat(currentEquation)
    lines.push(line1 + '\n');
    lines.push(line2 + '\n');
    lines.push(line3 + '\n');
    lines.push('\n');
    lines.push('\n');
  })

  if (alignRight) {
    console.log(longestLineLength);
    lines = lines.map(line =>
      line.padStart(longestLineLength + 1, ' ') // +1 for newline
    )
  }

  return lines.join('');

  function getTermLength(termPair) {
    const largerTerm = (termPair[0] >  termPair[1]) ? termPair[0] : termPair[1];
    return String(largerTerm).length
  }
}
