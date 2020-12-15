const fs = require('fs').promises;


const solveSlow = (numbers, n) => {
  const table = [ ...numbers ];
  while (table.length < n) {
    const lastNum = table[table.length - 1];
    const prevIdx = table.slice(0, -1).lastIndexOf(lastNum);
    if (prevIdx === -1) {
      table.push(0);
    } else {
      table.push(table.length - 1 - prevIdx);
    }
  }
  return table[n - 1];
};

// console.log(solveSlow([0,3,6], 10)); // 0
// console.log(solveSlow([20,0,1,11,6,3], 2020)); // 421


const solveFast = (numbers, n) => {
  const history = {};
  let lastNum;
  for (let i = 0; i < numbers.length; i += 1) {
    const num = numbers[i];
    history[num] = [i];
    lastNum = num;
  }

  let count = numbers.length;
  while (count < n) {
    if (history[lastNum].length === 1) {
      lastNum = 0;
    } else {
      const [ old, recent ] = history[lastNum];
      lastNum = recent - old;
    }

    if (!(lastNum in history))
      history[lastNum] = [];

    history[lastNum].push(count);

    if (history[lastNum].length > 2)
      history[lastNum].shift();

    count += 1;
  }

  return lastNum;
};
// console.log(solveFast([0,3,6], 10)); // 0
// console.log(solveFast([20,0,1,11,6,3], 2020)); // 421
// console.log(solveFast([0,3,6], 30000000)); // ?

start = Date.now();
console.log(solveFast([20,0,1,11,6,3], 30000000)); // ?
end = Date.now();
console.log(`finished in ${end - start}ms`);


// let speedSize = 100000;

// start = Date.now();
// solveFast([20,0,1,11,6,3], speedSize);
// end = Date.now();
// console.log(`finished in ${end - start}ms`);

// start = Date.now();
// solveSlow([20,0,1,11,6,3], speedSize);
// end = Date.now();
// console.log(`finished in ${end - start}ms`);
