const fs = require('fs').promises;

const readLines = async () => {
  const data = await fs.readFile('./input', {encoding: 'utf-8'});
  return data.split('\n');
};

const solve = async () => {
  const lines = await readLines();
  const moves = [
    [1,1],
    [3,1],
    [5,1],
    [7,1],
    [1,2],
  ];

  let treeCount = 1;

  for (let navigation of moves) {
    const [ right, down ] = navigation;
    treeCount *= numTrees(lines, right, down);
  }
  return treeCount;
};

const numTrees = (rows, rightMove, downMove) => {
  const width = rows[0].length;
  let numTrees = 0;
  let colIndex = 0;
  for (let rowIndex = 0; rowIndex < rows.length; rowIndex += downMove) {
    if (rows[rowIndex][colIndex % width] === '#') {
      numTrees++;
    }
    colIndex += rightMove;
  }
  return numTrees;
}

solve().then(console.log); // 736527114