const fs = require('fs').promises;

const readLines = async () => {
  const data = await fs.readFile('./input', {encoding: 'utf-8'});
  return data.split('\n');
};

const solve = async () => {
  const lines = await readLines();
  const [ line1, line2 ] = lines;
  const earliest = Number(line1);
  const buses = line2.split(',')
    .filter(bus => bus !== 'x')
    .map(bus => Number(bus));
  
  for (let time = earliest; true; time += 1) {
    for (let bus of buses) {
      if (time % bus === 0) {
        const waitTime = time - earliest;
        return waitTime * bus;
      }
    }
  }

};

solve().then(console.log); // 3035