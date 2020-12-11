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
  for (let i = 0; i < numbers.length; i++) {
    for (let j = i + 1; j < numbers.length; j++) {
      const subArray = numbers.slice(i, j+1);
      if (sumArray(subArray) === invalidNum) {
        const endTime = Date.now();
        console.log(`finished in ${endTime - startTime}ms.`);
        return Math.min(...subArray) + Math.max(...subArray);
      }
    }
  }
};

const sumArray = (array) => {
  let sum = 0;
  for (let ele of array) {
    sum += ele;
  }
  return sum;
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


solve().then(console.log); // 51152360