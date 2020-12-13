const fs = require('fs').promises;

const readLines = async () => {
  const data = await fs.readFile('./input', {encoding: 'utf-8'});
  return data.split('\n');
};

const solve = async () => {
  const lines = await readLines();
  let borderedGrid = lines.map(line => ['.', ...line.split(''), '.']);
  const floorRow = Array(borderedGrid[0].length).fill('.');
  let grid = [floorRow, ...borderedGrid, floorRow];

  let stable = false;
  while (!stable) {
    const { newGrid, isStable } = simulateRound(grid);
    grid = newGrid
    stable = isStable;
  };
  return charCount(grid, '#');
};

const copyGrid = (grid) => {
  return grid.map(row => [...row]);
};

const charCount = (grid, char) => {
  let count = 0;
  for (let row = 0; row < grid.length; row += 1) {
    for (let col = 0; col < grid[0].length; col += 1) {
      if (grid[row][col] === char)
        count += 1;
    }
  }
  return count;
}

const simulateRound = (grid) => {
  const newGrid = copyGrid(grid);

  let isStable = true;

  for (let row = 1; row < grid.length - 1; row += 1) {
    for (let col = 1; col < grid[0].length - 1; col += 1) {
      const center = grid[row][col];

      const adjacencies = [
        grid[row - 1][col] === '#',
        grid[row + 1][col] === '#',
        grid[row][col + 1] === '#',
        grid[row][col - 1] === '#',
        grid[row - 1][col + 1] === '#',
        grid[row + 1][col + 1] === '#',
        grid[row - 1][col - 1] === '#',
        grid[row + 1][col - 1] === '#'
      ];

      const numOccupied = adjacencies.reduce((a, b) => a + b, 0);

      if (center === 'L' && numOccupied === 0) {
        newGrid[row][col] = '#';
        isStable = false;
      }

      if (center === '#' && numOccupied >= 4) {
        newGrid[row][col] = 'L';
        isStable = false;
      }
    }
  }
  return {
    newGrid,
    isStable,
  };
}



solve().then(console.log); // 2324