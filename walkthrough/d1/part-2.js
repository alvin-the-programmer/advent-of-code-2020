const fs = require('fs').promises;

const parseLines = async () => {
  const data = await fs.readFile('./input', {encoding: 'utf-8'});
  return data.split('\n');
};

const solve = async () => {
  const lines = await parseLines();
  const numbers = lines.map(Number);
  const pairSums = {};
  for (let i = 0; i < numbers.length; i++) {
    for (let j = i + 1; j < numbers.length; j++) {
      const num1 = numbers[i];
      const num2 = numbers[j];
      const sum = num1 + num2;
      pairSums[sum] = [num1, num2];
    }
  }

  for (let num of numbers) {
    const diff = 2020 - num;
    if (diff in pairSums) {
      const [ numB, numC ] = pairSums[diff];
      return num * numB * numC;
    }
  }
};

solve().then(console.log); // 80072256