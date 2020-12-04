const fs = require('fs').promises;

const readLines = async () => {
  const data = await fs.readFile('./input', {encoding: 'utf-8'});
  return data.split('\n');
};

const solve = async () => {
  const lines = await readLines();
  const width = lines[0].length;
  let numTrees = 0;
  let colIndex = 0;
  for (let rowIndex = 0; rowIndex < lines.length; rowIndex++) {
    if (lines[rowIndex][colIndex % width] === '#') {
      numTrees++;
    }
    colIndex += 3;
  }
  return  numTrees
};

solve().then(console.log); // 167