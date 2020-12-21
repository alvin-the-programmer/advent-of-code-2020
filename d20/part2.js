const fs = require('fs').promises;

const BLOCK_SIZE = 10;
const MONSTER = `
                  # 
#    ##    ##    ###
 #  #  #  #  #  #   
`;
const HASH_PER_MONSTER = 15;

const readLines = async () => {
  // const data = await fs.readFile('./example', {encoding: 'utf-8'});
  const data = await fs.readFile('./input', {encoding: 'utf-8'});
  return data.split('\n\n');
};

const solve = async () => {
  const chunks = await readLines();
  const numBlocks = chunks.length;
  const blocks = parseBlocks(chunks);
  const edges = {};
  const edgeCount = {};
  const neighbors = {};
  for (let blockId in blocks) {
    const edgeList = getEdges(blocks[blockId])
    for (let edge of edgeList) {
      if (!(edge in edgeCount)) 
        edgeCount[edge] = 0;
      edgeCount[edge] += 1;
    }
    edges[blockId] = new Set(edgeList);
    neighbors[blockId] = new Set();
  }
  
  for (let blockA in blocks) {
    for (let blockB in blocks) {
      if (blockA !== blockB) {
        const edgesA = edges[blockA];
        const edgesB = edges[blockB];
        const overlap = intersection(edgesA, edgesB);
        if (overlap.size > 0) {
          neighbors[blockA].add(blockB);
          neighbors[blockB].add(blockA);
        }
      }
    }
  }
  
  const corners = [];
  for (let blockId in neighbors) {
    if (neighbors[blockId].size === 2)
      corners.push(blockId);
  }

  const cornerId = corners[0];
  let cornerBlock = blocks[cornerId];
  
  for (let block of getOrientations(cornerBlock)) {
    const [ top, left ] = getEdges(block);
    if (edgeCount[top] === 1 && edgeCount[left] === 1) {
      cornerBlock = block;
      break;
    }
  }

  const complete = new Set([cornerId]);
  const boardSideLength = Math.sqrt(numBlocks);
  const board = Array(boardSideLength).fill().map(() => Array(boardSideLength));
  board[0][0] = [ cornerId, cornerBlock ];

  for (let r = 0; r < boardSideLength; r += 1) {
    for (let c = 0; c < boardSideLength; c += 1) {
      const [ currId, currBlock ] = board[r][c];
      const [ currTop, currLeft, currBottom, currRight ] = getEdges(currBlock);
      const candidateIds = minus(neighbors[currId], complete);
      for (let candidateId of candidateIds) {
        for (let candidateBlock of getOrientations(blocks[candidateId])) {
          const [ candidateTop, candidateLeft, candidateBottom, candidateRight ] = getEdges(candidateBlock);
          
          if (r + 1 < boardSideLength && candidateTop === currBottom) {
            board[r + 1][c] = [ candidateId, candidateBlock ];
            complete.add(candidateId);
          }

          if (c + 1 < boardSideLength && candidateLeft === currRight) {
            board[r][c + 1] = [ candidateId, candidateBlock ];
            complete.add(candidateId);
          } 
        }
      }
    }
  }
  const grid = convertBoard(board);
  const trimmedGrid = trimBorders(grid);
  const totalHash = countChar(trimmedGrid, '#');
  for (let finalGrid of getOrientations(trimmedGrid)) {
    const numMonsters = countMonsters(finalGrid);
    if (numMonsters > 0) {
      return totalHash - (numMonsters * HASH_PER_MONSTER);
    }
  }
};

const countMonsters = (grid) => {
  const monsterLines = MONSTER.split('\n');
  const pattern = monsterLines.slice(1, -1);
  const patternHeight = 3;
  const patternWidth = 20;
  const patternStr = pattern.flat().join('');
  let count = 0;
  for (let r = 0; r < grid.length; r += 1) {
    for (let c = 0; c < grid.length; c += 1) {
      const subgrid = getSubgrid(grid, r, c, patternHeight, patternWidth);
      if (subgrid !== null) {
        const candidate = subgrid.flat().join('');
        if (patternFound(candidate, patternStr))
          count += 1;
      }
    }
  }
  return count;
};

const countChar = (grid, char) => {
  let count = 0;
  for (let r = 0; r < grid.length; r += 1) {
    for (let c = 0; c < grid[0].length; c += 1) {
      if (grid[r][c] === char) {
        count += 1;
      }
    }
  }
  return count;
};

const patternFound = (candidateStr, pattern) => {
  for (let i = 0; i < pattern.length; i += 1) {
    if (pattern[i] === '#' && candidateStr[i] !== '#')
      return false;
  }
  return true;
};

const getSubgrid = (grid, r, c, height, width) => {
  if (r + height > grid.length || c + width > grid.length)
    return null;
  
  const rows = [];
  for (let i = 0; i < height; i += 1) {
    const row = [];
    for (let j = 0; j < width; j += 1) {
      row.push(grid[r + i][c + j]);
    }
    rows.push(row);
  }
  return rows;
};

const convertBoard = (board) => {
  const gridSize = board.length * BLOCK_SIZE;
  const grid = Array(gridSize).fill().map(() => Array(gridSize));
  for (let boardRow = 0; boardRow < board.length; boardRow += 1) {
    for (let boardCol = 0; boardCol < board.length; boardCol += 1) {
      const [ id, block ] = board[boardRow][boardCol];
      const rowOffset = boardRow * BLOCK_SIZE;
      const colOffset = boardCol * BLOCK_SIZE;
      for (let r = 0; r < block.length; r += 1) {
        for (let c = 0; c < block.length; c += 1) {
          grid[rowOffset + r][colOffset + c] = block[r][c];
        }
      }
    }
  }
  return grid;
};

const trimBorders = (grid) => {
  const newGrid = [];
  for (let r = 0; r < grid.length; r += 1) {
    const newRow = []
    for (let c = 0; c < grid.length; c += 1) {
      const isBorderRow = (r % BLOCK_SIZE === 0 || (r + 1) % BLOCK_SIZE === 0);
      const isBorderCol = (c % BLOCK_SIZE === 0 || (c + 1) % BLOCK_SIZE === 0);
      if (!isBorderRow && !isBorderCol) {
        newRow.push(grid[r][c]);
      }
    }
    if (newRow.length > 0)
      newGrid.push(newRow);
  }
  return newGrid;
};

const minus = (set1, set2) => {
  const diff = new Set();
  for (let item of set1) {
    if (!set2.has(item))
      diff.add(item);
  }
  return diff;
};

const rotate = (grid, amt) => {
  let newGrid = grid;
  for (let i = 0; i < amt; i += 1) {
    newGrid = newGrid[0].map((val, index) => newGrid.map(row => row[index]).reverse());
  }
  return newGrid;
};

const flip = (grid, amt) => {
  const newGrid = [ ...grid ];
  if (amt === 1) {
    return newGrid.reverse();
  } else {
    return newGrid;
  }
};

const printGrid = (grid) => {
  console.log();
  for (let row of grid) {
    console.log(row.join(''));
  }
};

const getOrientations = (grid) => {
  const orientations = [];
  for (let flipAmt = 0; flipAmt < 2; flipAmt += 1) {
    const flippedGrid = flip(grid, flipAmt);
    for (let rotAmt = 0; rotAmt < 4; rotAmt += 1) {
      const newGrid = rotate(flippedGrid, rotAmt);
      orientations.push(newGrid);
    }
  }
  return orientations;
};

const parseBlocks = (chunks) => {
  const blocks = {};
  for (let chunk of chunks) {
    const lines = chunk.split('\n');
    const header = lines[0];
    const number = header.slice(5, -1);
    const block = lines.slice(1);
    blocks[number] = block.map(l => l.split(''));
  }
  return blocks;
};

const getEdges = (block) => {
  let top = block[0].join('');
  let bottom = block[block.length - 1].join('');
  let left = '';
  let right = '';
  for (let r = 0; r < block.length; r += 1) {
    left += block[r][0];
    right += block[r][block[0].length - 1];
  }

  return [
    top, 
    left, 
    bottom, 
    right,
    top.split('').reverse().join(''), 
    left.split('').reverse().join(''), 
    bottom.split('').reverse().join(''), 
    right.split('').reverse().join('')
  ];
};

const intersection = (s1, s2) => {
  const intersect = new Set();
  for (let item of s1) {
    if (s2.has(item))
      intersect.add(item);
  }
  return intersect;
};

solve().then(console.log); 
