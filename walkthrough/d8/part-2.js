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

const getAcc = (instructions, i = 0, visited = new Set(), flipAvailable=true) => {
  if (i === instructions.length)
    return 0;

  if (visited.has(i))
    return -Infinity;
  
  visited.add(i);
  const newVisited = new Set(visited);
  
  const { type, val } = instructions[i];

  if (type === 'jmp') {

    const paths = [
      getAcc(instructions, i + val, newVisited, flipAvailable)
    ];
    if (flipAvailable)
      paths.push(getAcc(instructions, i + 1, newVisited, false));
    return Math.max(...paths);

  } else if (type === 'nop') {

    const paths = [
      getAcc(instructions, i + 1, newVisited, flipAvailable)
    ];
    if (flipAvailable)
      paths.push(getAcc(instructions, i + val, newVisited, false))
    return Math.max(...paths);

  } else { // acc
    return val + getAcc(instructions, i + 1, newVisited, flipAvailable);
  }
};

const parseInstruction = (str) => {
  const [ type, val ] = str.split(' ');
  return {
    type,
    val: Number(val)
  };
};

solve().then(console.log); // 1539