const { DH_UNABLE_TO_CHECK_GENERATOR } = require('constants');
const { link } = require('fs');

const fs = require('fs').promises;

const readLines = async () => {
  const data = await fs.readFile('./input', {encoding: 'utf-8'});
  return data.split('\n');
};

const solve = async () => {
  const lines = await readLines();
  const numbers = lines.map(Number);
  const sorted = numbers.sort((a, b) => a - b);
  const oneCount = diffCount(sorted, 1) + 1;
  const threeCount = diffCount(sorted, 3) + 1;
  return oneCount * threeCount
};

const diffCount = (sorted, diff) => {
  let count = 0;
  for (let i = 0; i < sorted.length - 1; i += 1) {
    const curr = sorted[i];
    const next = sorted[i+1];
    if (next - curr === diff)
      count += 1;
  }
  return count;
};

solve().then(console.log)