const fs = require('fs').promises;

const readLines = async () => {
  const data = await fs.readFile('./input', {encoding: 'utf-8'});
  return data.split('\n');
};

const solve = async () => {
  const lines = await readLines();
  let state = getActiveNodes(lines);
  
  for (let i = 0; i < 6; i += 1) {
    state = stepSimulation(state);
  }

  return state.size;
};

const stepSimulation = (activeNodes) => {
  const newNodes = new Set();

  const activationCounts = {};

  for (let node of activeNodes) {
    const neighbors = getNeighbors(node);
    let activeNeighborCount = 0;
    
    for (let neighbor of neighbors) {
      if (activeNodes.has(neighbor)) {
        activeNeighborCount += 1
      } else {
        if (!(neighbor in activationCounts))
          activationCounts[neighbor] = 0;
        activationCounts[neighbor] += 1;
      }
    }

    if (activeNeighborCount === 2 || activeNeighborCount === 3)
      newNodes.add(node);
  }

  for (let potentialNode in activationCounts) {
    if (activationCounts[potentialNode] === 3)
      newNodes.add(potentialNode);
  }

  return newNodes;
}

const getActiveNodes = (lines) => {
  const nodes = new Set();
  for (let x = 0; x < lines.length; x += 1) {
    for (let y = 0; y < lines[0].length; y += 1) {
      const char = lines[x][y];
      if (char === '#') {
        const node = getNodeFromArray([x, y, 0]);
        nodes.add(node);
      }
    }
  }
  return nodes;
}

const getNodeFromArray = (triplet) => {
  return triplet.join(',');
};

const getNeighbors = (node) => {
  const [ x, y, z ] = node.split(',').map(Number);
  const neighbors = new Set();

  for (let deltaX = -1; deltaX <= 1; deltaX += 1) {
    for (let deltaY = -1; deltaY <= 1; deltaY += 1) {
      for (let deltaZ = -1; deltaZ <= 1; deltaZ += 1) {
        const neighbor = getNodeFromArray([ x + deltaX, y + deltaY, z + deltaZ ]);
        neighbors.add(neighbor);
      }
    }
  }

  neighbors.delete(node);
  return neighbors
};

solve().then(console.log); // 298














