const fs = require('fs').promises;

const readLines = async () => {
  const data = await fs.readFile('./input', {encoding: 'utf-8'});
  return data.split('\n');
};

const solve = async () => {
  const lines = await readLines();
  let state = parseInitialNodes(lines);

  for (let i = 0; i < 6; i += 1) {
    state = stepSimulation(state);
  }

  return state.size;
};

const stepSimulation = (state) => {
  const newState = new Set();

  const potential = {};
  // handle existing nodes
  for (let activeNode of state) {
    const neighbors = getNeighbors(activeNode);

    let activeNeighborCount = 0;
    for (let neighbor of neighbors) {
      if (state.has(neighbor))
        activeNeighborCount += 1;

      if (neighbor in potential) {
        potential[neighbor] += 1;
      } else {
        potential[neighbor] = 1;
      }
    }
    
    if (activeNeighborCount === 2 || activeNeighborCount === 3)
      newState.add(activeNode);
  }

  // create new nodes
  for (let node in potential) {
    if (potential[node] === 3)
      newState.add(node);
  }

  return newState;
};

const getNeighbors = (node) => {
  const [ x, y, z, w ] = tripletFromNode(node);
  const neighbors = new Set();
  const deltas = [-1, 0, 1];
  for (let xDelta of deltas) {
    for (let yDelta of deltas) {
      for (let zDelta of deltas) {
        for (let wDelta of deltas) {
          const neighbor = nodeFromQuad([x + xDelta, y + yDelta, z + zDelta, w + wDelta]);
          neighbors.add(neighbor);
        }
      }
    }
  }
  neighbors.delete(node);
  return neighbors;
};


const parseInitialNodes = (lines) => {
  const set = new Set();
  for (let x = 0; x < lines.length; x += 1) {
    for (let y = 0; y < lines[0].length; y += 1) {
      let nodeKey = nodeFromQuad([x, y, 0, 0]);
      if (lines[x][y] === '#')
      set.add(nodeKey);
    }
  }
  return set;
};

const nodeFromQuad = (triplet) => {
  return triplet.join(',');
};

const tripletFromNode = (node) => {
  return node.split(',').map(Number);
}

solve().then(console.log); 