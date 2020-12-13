const fs = require('fs').promises;

const readLines = async () => {
  const data = await fs.readFile('./example', {encoding: 'utf-8'});
  // const data = await fs.readFile('./input', {encoding: 'utf-8'});
  return data.split('\n');
};


const solve = async () => {
  const lines = await readLines();
  const [ line1, line2 ] = lines;

  // treat 'x' as freebies; buses that depart every minute 
  const buses = line2
    .split(',')
    .map(bus => bus === 'x' ? 1 : Number(bus));

  // take the first bus at time 0
  let totalTime = 0;
  let mainBus = buses[0];
  
  for (let i = 1; i < buses.length; i++) { // done when we take every bus
    let bus = buses[i];

    while ((totalTime + i) % bus !== 0) // ride `mainBus` until...
      totalTime += mainBus;             // it aligns with the schedule of the current `bus`,
                                        // accounting for the offset i

    mainBus *= bus; // mainBus represents a logical bus that stops whenever buses #0 through #i align
  }
  return totalTime;
};


// example solution 1068781
// input solution 725169163285238
solve().then(console.log); 