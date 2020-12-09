const fs = require('fs').promises;

const readLines = async () => {
  const data = await fs.readFile('./input', {encoding: 'utf-8'});
  return data.split('\n');
};

const solve = async () => {
  const lines = await readLines();
  const instructions = lines.map(parseLine);
  return lastAcc(instructions);
};

const lastAcc = (instructions, i = 0, visited = new Set()) => {
  if (visited.has(i))
    return 0;

  visited.add(i);

  const { op, val } = instructions[i];
  if (op === 'jmp') {
    return lastAcc(instructions, i + val, visited);
  } else if (op === 'acc') {
    return val + lastAcc(instructions, i + 1, visited);
  } else { // nop
    return lastAcc(instructions, i + 1, visited);
  }
};

const parseLine = (line) => {
  const [ op, val ] = line.split(' ');
  return { op, val: Number(val) };
};


solve().then(console.log); 