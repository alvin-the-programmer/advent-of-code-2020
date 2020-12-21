const fs = require('fs').promises;

const readLines = async () => {
  const data = await fs.readFile('./input', {encoding: 'utf-8'});
  // const data = await fs.readFile('./example', {encoding: 'utf-8'});
  return data.split('\n\n');
};

const solve = async () => {
  const chunks = await readLines();
  const blocks = parseBlocks(chunks);

  const edges = {};
  const neighbors = {};
  for (let blockId in blocks) {
    edges[blockId] = new Set(getEdges(blocks[blockId]));
    neighbors[blockId] = [];
  }
  
  for (let blockA in blocks) {
    for (let blockB in blocks) {
      if (blockA !== blockB) {
        const edgesA = edges[blockA];
        const edgesB = edges[blockB];
        const overlap = intersection(edgesA, edgesB);
        if (overlap.size > 0) {
          neighbors[blockA].push(blockB);
          neighbors[blockB].push(blockA);
        }
      }
    }
  }
  
  const corners = [];
  for (let blockId in neighbors) {
    if (neighbors[blockId].length === 4)
      corners.push(blockId);
  }

  return corners.map(Number).reduce((product, num) => product * num, 1);
};

const parseBlocks = (chunks) => {
  const blocks = {};
  for (let chunk of chunks) {
    const lines = chunk.split('\n');
    const header = lines[0];
    const number = header.slice(5, -1);
    const block = lines.slice(1);
    blocks[number] = block;
  }
  return blocks;
};

const getEdges = (block) => {
  let top = block[0];
  let bottom = block[block.length - 1];
  let left = '';
  let right = '';
  for (let r = 0; r < block.length; r += 1) {
    left += block[r][0];
    right += block[r][block[0].length - 1];
  }

  return [
    top, 
    bottom, 
    left, 
    right,
    top.split('').reverse().join(''), 
    bottom.split('').reverse().join(''), 
    left.split('').reverse().join(''), 
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
