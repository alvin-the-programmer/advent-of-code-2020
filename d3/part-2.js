const fs = require('fs').promises;

const readLines = async () => {
  const data = await fs.readFile('./input', {encoding: 'utf-8'});
  return data.split('\n');
};

const solve = async () => {
  const lines = await readLines();
  const routes = [
    [1, 1],
    [3, 1],
    [5, 1],
    [7, 1],
    [1, 2]
  ];

  let product = 1;
  for (let route of routes) {
    const [ right, down ] = route;
    product *= treeCount(lines, right, down);
  }
  return product;
};

const treeCount = (lines, right, down) => {
  const rowLength = lines[0].length;
  let treeCount = 0;
  let colIndex = 0;
  for (let rowIndex = 0; rowIndex < lines.length; rowIndex += down) {
    if (lines[rowIndex][colIndex % rowLength] === '#')
      treeCount += 1;
    colIndex += right;
  }
  return treeCount;
};

solve().then(console.log);