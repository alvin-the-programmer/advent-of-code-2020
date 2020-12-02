const fs = require('fs').promises;

const parseLines = async () => {
  const data = await fs.readFile('./example', {encoding: 'utf-8'});
  return data.split('\n');
};

// O(n^2) time
// O(n^2) space
const solve = async () => {
  const lines = await parseLines();
  const numbers = lines.map(Number);

  const sums = {};
  for (let i = 0; i < numbers.length; i += 1) {
    for (let j = i + 1; j < numbers.length; j += 1) {
      const num1 = numbers[i];
      const num2 = numbers[j];
      sums[num1 + num2] = [num1, num2];
    }
  }

  for (let numA of numbers) {
    const addend = 2020 - numA;
    if (addend in sums) {
      const [ numB, numC ] = sums[addend];
      console.log(numA, numB, numC);
      return numA * numB * numC;
    }
  }
};

solve().then(console.log);
// 80072256
