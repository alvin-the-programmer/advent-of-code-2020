const fs = require('fs').promises;

const readLines = async () => {
  const data = await fs.readFile('./input', {encoding: 'utf-8'});
  return data.split('\n');
};

const solve = async () => {
  const lines = await readLines();
  const [ line1, line2 ] = lines;
  const buses = line2.split(',')
    .map(bus => bus === 'x' ? 1 : Number(bus));
  
  let time = 0;
  let stepSize = buses[0];

  for (let i = 1; i < buses.length; i += 1) {
    const bus = buses[i];

    while ((time + i) % bus !== 0) {
      time += stepSize;
    }

    stepSize *= bus;
  }

  return time;
};

solve().then(console.log); 
