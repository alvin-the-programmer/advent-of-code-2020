const fs = require('fs').promises;

const solve = async () => {
  const lines = await readLines();
  let numValid = 0;
  for (let line of lines) {
    const { pos1, pos2, char, password } = parseLine(line);
    if (password[pos1] === char ^ password[pos2] === char)
      numValid += 1;
  }
  return numValid;
};

const readLines = async () => {
  const data = await fs.readFile('./input', {encoding: 'utf-8'});
  return data.split('\n');
};

const parseLine = (line) => {
  const [ rangeSeg, charSeg, password ] = line.split(' ');
  const [ pos1, pos2 ] = rangeSeg.split('-').map(Number);
  const char = charSeg[0];
  return {
    pos1: pos1 - 1, 
    pos2: pos2 - 1, 
    char,
    password
  };
};

solve().then(console.log);