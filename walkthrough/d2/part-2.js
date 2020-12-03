const fs = require('fs').promises;   

const readLines = async () => {
  const data = await fs.readFile('./input', {encoding: 'utf-8'});
  return data.split('\n');
};

const solve = async () => {
  const lines = await readLines();
  let numValid = 0;
  for (let line of lines) {
    const { pos1, pos2, char, password } = createObj(line);
    const isAtPos1 = password[pos1] === char;
    const isAtPos2 = password[pos2] === char
    if ((isAtPos1 || isAtPos2) && !(isAtPos1 && isAtPos2)) {
      numValid++;
    }
  }
  return numValid;
};

const createObj = (line) => {
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


solve().then(console.log); // 497