const fs = require('fs').promises;

const parseLines = async () => {
  const data = await fs.readFile('./input', {encoding: 'utf-8'});
  return data.split('\n');
};

const solve = async () => {
  const lines = await parseLines();
  const numbers = lines.map(Number);
  const numberSet = new Set();
  for (let number of numbers) {
    const difference = 2020 - number;
    if (numberSet.has(difference)) {
      return number * difference;
    }
    numberSet.add(number);
  }
};

solve().then(console.log); // 1014624