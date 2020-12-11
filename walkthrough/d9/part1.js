const fs = require('fs').promises;

const readLines = async () => {
  const data = await fs.readFile('./input', {encoding: 'utf-8'});
  return data.split('\n');
};

const solve = async () => {
  const lines = await readLines();
  const numbers = lines.map(Number);
  return firstInvalid(numbers);
};

const firstInvalid = (numbers) => {
  for (let i = 25; i < numbers.length; i++) {
    const prev = numbers.slice(i-25, i);
    if (pairSum(prev, numbers[i]) === false) {
      return numbers[i];
    }
  }
};

const pairSum = (array, target) => {
  for (let i = 0; i < array.length; i++) {
    for (let j = i + 1; j < array.length; j++) {
      if (array[i] + array[j] === target)
        return true;
    }
  }
  return false;
};

solve().then(console.log); // 373803594