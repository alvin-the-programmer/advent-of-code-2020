const fs = require('fs').promises;

const readLines = async () => {
  const data = await fs.readFile('./input', {encoding: 'utf-8'});
  return data.split('\n');
};

const solve = async () => {
  const lines = await readLines();
  const instructions = lines.map(parseInstruction);
  return getAcc(instructions);
};

const getAcc = (instructions, i = 0, visited = new Set()) => {
  if (visited.has(i))
    return 0;
  
  visited.add(i);
  
  const { type, val } = instructions[i];

  if (type === 'jmp') {
    return getAcc(instructions, i + val, visited);
  } else if (type === 'acc') {
    return val + getAcc(instructions, i + 1, visited);
  } else {
    return getAcc(instructions, i + 1, visited);
  }
};

const parseInstruction = (str) => {
  const [ type, val ] = str.split(' ');
  return {
    type,
    val: Number(val)
  };
};

solve().then(console.log); // 1489