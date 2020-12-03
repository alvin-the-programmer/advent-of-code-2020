const fs = require('fs').promises;

const readLines = async () => {
  const data = await fs.readFile('./input', {encoding: 'utf-8'});
  return data.split('\n');
};

const solve = async () => {
  const lines = await readLines();
  const rowLength = lines[0].length;
  let treeCount = 0;
  let colIndex = 0;
  for (let rowIndex = 0; rowIndex < lines.length; rowIndex += 1) {
    if (lines[rowIndex][colIndex % rowLength] === '#')
      treeCount += 1;
    colIndex += 3;
  }
  return treeCount;
};

solve().then(console.log);