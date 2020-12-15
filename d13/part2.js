const fs = require('fs').promises;

const readLines = async () => {
  // const data = await fs.readFile('./example1', {encoding: 'utf-8'});
  const data = await fs.readFile('./input', {encoding: 'utf-8'});
  return data.split('\n');
};


const solve = async () => {
  const lines = await readLines();
  const [ line1, line2 ] = lines;

  const buses = line2
    .split(',')
    .map(bus => bus === 'x' ? 1 : Number(bus));

  let totalTime = 0;
  let mainBus = buses[0];
  
  for (let i = 1; i < buses.length; i++) { 
    let bus = buses[i];

    while ((totalTime + i) % bus !== 0) {
      totalTime += mainBus;      
    }


    mainBus *= bus;
  }
  return totalTime;
};


// example solution 1068781
// input solution 725169163285238
solve().then(console.log); 