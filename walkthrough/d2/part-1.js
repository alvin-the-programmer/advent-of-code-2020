const fs = require('fs').promises;

const readLines = async () => {
  const data = await fs.readFile('./input', {encoding: 'utf-8'});
  return data.split('\n');
};

const solve = async () => {
  const lines = await readLines();
  let numValid = 0;
  for (let line of lines) {
    const { min, max, char, password } = createObj(line);
    const count = charCount(char, password);
    if (min <= count && count <= max) {
      numValid++;
    }
  }
  return numValid;
};

const createObj = (line) => {
  const [ rangeSeg, charSeg, password ] = line.split(' ');
  const [ min, max ] = rangeSeg.split('-').map(Number);
  const char = charSeg[0];

  return {
    min,
    max,
    char,
    password
  };
};

const charCount = (target, str) => {
  let count = 0;
  for (let char of str) {
    if (char === target) {
      count += 1;
    }
  }
  return count;
};

solve().then(console.log); // 528