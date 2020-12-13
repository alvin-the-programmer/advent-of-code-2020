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
};

const grid1 = [
  [1,  2,  3,  4,  5,  6],
  [7,  8,  9,  10, 11, 12],
  [13, 14, 15, 16, 17, 18],
  [19, 20, 21, 22, 23, 24],
  [25, 26, 27, 28, 28, 30],
  [31, 32, 33, 34, 35, 36],
];

const getX = (grid, row, col) => {
  return [ 
    grid[row].slice(0, col).reverse(),
    grid[row].slice(col + 1)
  ];
};

// console.log(getX(grid1, 2, 2));

const getY = (grid, row, col) => {
  const aboveAxis = [];
  for (let i = row - 1; i >= 0; i -= 1)
    aboveAxis.push(grid[i][col]);
  
  const belowAxis = [];
  for (let i = row + 1; i < grid.length; i += 1)
    belowAxis.push(grid[i][col]);

  return [
    aboveAxis,
    belowAxis
  ]
};
// console.table(grid1);
// console.log(getY(grid1, 2, 2));


const getZ = (grid, row, col) => {
  const leftAxis = [];
  for (let i = 1; row - i >= 0 && col - i >= 0; i += 1)
    leftAxis.push(grid[row - i][col - i]);

  const rightAxis = [];
  for (let i = 1; row + i < grid.length && col + i < grid[0].length; i += 1)
    rightAxis.push(grid[row + i][col + i]);
  
  return [
    leftAxis,
    rightAxis
  ];
};

// console.table(grid1);
// console.log(getZ(grid1, 2, 2));

const getW = (grid, row, col) => {
  const leftAxis = [];
  for (let i = 1; row + i < grid.length && col - i >= 0; i += 1)
    leftAxis.push(grid[row + i][col - i]);

  const rightAxis = [];
    for (let i = 1; row - i >= 0 && col + i < grid[0].length; i += 1)
      rightAxis.push(grid[row - i][col + i]);
  
  return [
    leftAxis,
    rightAxis
  ];
};


const nearestNeighbors = (grid, row, col) => {
  const neighbors = [];

  [getX, getY, getZ, getW].forEach(getAxis => {
    const [ sideA, sideB ] = getAxis(grid, row, col);
    for (let spot of sideA) {      
      if (spot !== '.') {
        neighbors.push(spot);
        break;
      }
    }

    for (let spot of sideB) {      
      if (spot !== '.') {
        neighbors.push(spot);
        break;
      }
    }
  });

  return neighbors;
};

const simulateRound = (grid) => {
  const newGrid = copyGrid(grid);

  let isStable = true;

  for (let row = 1; row < grid.length - 1; row += 1) {
    for (let col = 1; col < grid[0].length - 1; col += 1) {
      const center = grid[row][col];

      const neighbors = nearestNeighbors(grid, row, col);

      let numOccupied = 0;

      for (let neighbor of neighbors) {
        if (neighbor === '#')
          numOccupied += 1;
      }
      
      if (center === 'L' && numOccupied === 0) {
        newGrid[row][col] = '#';
        isStable = false;
      }

      if (center === '#' && numOccupied >= 5) {
        newGrid[row][col] = 'L';
        isStable = false;
      }
    }
  }
  return {
    newGrid,
    isStable,
  };
};

solve().then(console.log); // 2068