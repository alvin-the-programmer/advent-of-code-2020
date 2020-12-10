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
    const target = numbers[i];
    const previousNums = numbers.slice(i - 25, i);
    if (!hasSum(previousNums, target)) {
     return target;
    }
  }
};


const hasSum = (numbers, target) => {
  for (let numA of numbers) {
    for (let numB of numbers) {
      if (numA + numB === target)
        return true;
    }
  }
  return false;
}

solve().then(console.log);