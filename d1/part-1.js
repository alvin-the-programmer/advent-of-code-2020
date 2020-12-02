const fs = require('fs').promises;

const parseLines = async () => {
  const data = await fs.readFile('./input', {encoding: 'utf-8'});
  return data.split('\n');
};

// O(n) time
// O(n) space
const solve = async () => {
  const lines = await parseLines();
  const numbers = lines.map(Number);

  const numSet = new Set();
  for (let num of numbers) {
    const addend = 2020 - num;
    if (numSet.has(addend))
      return addend * num;
    numSet.add(num);
  }
};

solve().then(console.log);
// 1014624