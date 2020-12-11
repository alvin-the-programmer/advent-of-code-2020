const fs = require('fs').promises;

const readLines = async () => {
  const data = await fs.readFile('./input', {encoding: 'utf-8'});
  return data.split('\n');
};

const solve = async () => {
  const lines = await readLines();
  const numbers = lines.map(Number);
  const sorted = numbers.sort((a, b) => a - b);
  const last = sorted[sorted.length - 1];
  const input = [ 0, ...sorted, last + 3];
  return diffCount(input, 1) * diffCount(input, 3);
};

const diffCount = (array, n) => {
  let count = 0;
  for (let i = 0; i < array.length - 1; i++) {
    const curr = array[i];
    const next = array[i + 1];
    if (next - curr === n)
      count++;
  }
  return count;
};



solve().then(console.log); // 1848