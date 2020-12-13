const fs = require('fs').promises;

const readLines = async () => {
  const data = await fs.readFile('./input', {encoding: 'utf-8'});
  return data.split('\n');
};

const solve = async () => {
  const lines = await readLines();
  let borderedGrid = lines.map(line => ['.', ...line.split(''), '.' ]);
  const floorRow = Array(borderedGrid[0].length).fill('.');
  borderedGrid = [ floorRow, ...borderedGrid, floorRow ];

  let currentGrid = borderedGrid;
  let isStable = false;
  while (!isStable) {
    const { newGrid, stable } = nextGeneration(currentGrid);
    currentGrid = newGrid;
    isStable = stable;
  }
  return charCount(currentGrid, '#');
};



const copy2D = (grid) => {
  return grid.map(row => [ ...row ]);
};

const charCount = (grid, char) => {
  let count = 0
  for (let i = 1; i < grid.length - 1; i += 1) {
    for (let j = 1; j < grid[0].length - 1; j += 1) {
      if (grid[i][j] === char)
        count += 1;
    }
  }
  return count;
};

const nextGeneration = (grid) => {
  const newGrid = copy2D(grid);  

  let isStable = true;
  for (let i = 1; i < grid.length - 1; i += 1) {
    for (let j = 1; j < grid[0].length - 1; j += 1) {
      const center = grid[i][j];

      const occupiedNeighbors = [
        grid[i - 1][j] === '#',
        grid[i + 1][j] === '#',
        grid[i][j + 1] === '#',
        grid[i][j - 1] === '#',
        grid[i - 1][j + 1] === '#',
        grid[i + 1][j + 1] === '#',
        grid[i - 1][j - 1] === '#',
        grid[i + 1][j - 1] === '#'
      ];

      let numOccupied = 0;
      for (let val of occupiedNeighbors) {
        if (val === true)
          numOccupied += 1;
      }

      if (center === 'L' && numOccupied === 0) {
        newGrid[i][j] = '#';
        isStable = false;
      } else if (center === '#' && numOccupied >= 4) {
        newGrid[i][j] = 'L';
        isStable = false;
      }
    }
  }

  return { newGrid, stable: isStable };
};



solve().then(console.log); // 2324