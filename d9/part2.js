const { read } = require('fs');

const fs = require('fs').promises;

const readLines = async () => {
  const data = await fs.readFile('./input', {encoding: 'utf-8'});
  return data.split('\n');
};

const solve = async () => {
  const lines = await readLines();
  const numbers = lines.map(Number);
  const invalidNum = firstInvalid(numbers);
  const startTime = Date.now();
  const subArray = subSum(numbers, invalidNum);
  const result =  Math.min(...subArray) + Math.max(...subArray);
  const endTime = Date.now();
  console.log(`finished in ${endTime - startTime}ms.`);
  return result;
};

const subSum = (array, target) => {
  for (let i = 0; i < array.length; i++) {
    for (let j = i + 1; j <= array.length; j++) {
      const subArray = array.slice(i, j);
      const sum = subArray.reduce((a, b) => a + b);
      if (sum === target)
        return subArray;
    }
  }
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
};
// 373803594
solve().then(console.log);