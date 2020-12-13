const fs = require('fs').promises;

const readLines = async () => {
  const data = await fs.readFile('./input', {encoding: 'utf-8'});
  return data.split('\n');
};

const solve = async () => {
  const lines = await readLines();
  const [ line1, line2 ] = lines;
  const earliestTime = Number(line1);
  const buses = line2.split(',').filter(el => el  !== 'x').map(Number);
  for (let i = earliestTime; true; i += 1) {
    for (let bus of buses) {
      if (i % bus === 0) {
        return (i - earliestTime) * bus;
      }
    }
  }
};

solve().then(console.log); // 3035