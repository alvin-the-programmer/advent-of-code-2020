const fs = require('fs').promises;

const readLines = async () => {
  const data = await fs.readFile('./input', {encoding: 'utf-8'});
  return data.split('\n');
};

const solve = async () => {
  const lines = await readLines();
  let numValid = 0;
  for (let line of lines) {
    const row = parseLine(line);
    const count = charCount(row.password, row.char);
    if (row.min <= count && count <= row.max)
      numValid += 1;
  }
  return numValid;
};

const parseLine = (line) => {
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

const charCount = (str, target) => {
  let count = 0;
  for (let char of str) {
    if (char === target)
      count += 1;
  }
  return count;
};

solve().then(console.log);