const fs = require('fs').promises;

const readLines = async () => {
  const data = await fs.readFile('./input', {encoding: 'utf-8'});
  return data.split('\n');
};

const solve = async () => {
  const lines = await readLines();
  const instructions = lines.map(parseLine);
  const start = Date.now();
  const result = lastAcc(instructions);
  const end = Date.now();
  console.log(`finished in ${end - start}ms.`);
  return result;
};

const lastAcc = (instructions, i = 0, visited = new Set(), flipAvailable=true) => {
  if (i === instructions.length)
    return 0;

  if (i < 0 || i > instructions.length || visited.has(i))
    return -Infinity;

  visited.add(i);

  const { op, val } = instructions[i];
  const newVisited = new Set(visited);

  if (op === 'jmp') {
    const paths = [lastAcc(instructions, i + val, newVisited, flipAvailable)];
    if (flipAvailable)
      paths.push(lastAcc(instructions, i + 1, newVisited, false));
    return Math.max(...paths);

  } else if (op === 'nop') { 
    const paths = [lastAcc(instructions, i + 1, newVisited, flipAvailable)];
    if (flipAvailable)
      paths.push(lastAcc(instructions, i + val, newVisited, false));
    return Math.max(...paths);

  } else {
    return val + lastAcc(instructions, i + 1, newVisited, flipAvailable);
  }
};

const parseLine = (line) => {
  const [ op, val ] = line.split(' ');
  return { op, val: Number(val) };
};

solve().then(console.log);