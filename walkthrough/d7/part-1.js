const { read } = require('fs');

const fs = require('fs').promises;

const readLines = async () => {
  const data = await fs.readFile('./input', {encoding: 'utf-8'});
  return data.split('\n');
};

const solve = async () => {
  const lines = await readLines();
  const graph = {};
  for (let line of lines) {
    const { destination, sources } = parseLine(line);
    if (!(destination in graph))
      graph[destination] = [];
    
    for (let source of sources) {
      if (!(source in graph))
        graph[source] = [];
      graph[source].push(destination);
    }
  }

  return traverse(graph, 'shiny gold bag') - 1;
};

const traverse = (graph, node, visited = new Set()) => {
  if (visited.has(node))
    return 0;
  
  visited.add(node);

  let numBagColors = 1;
  for (let neighbor of graph[node]) {
    numBagColors += traverse(graph, neighbor, visited);
  }
  return numBagColors;
};

const parseLine = (line) => {
  const [ destination, rest ] = line.split('s contain ');

  const sourceSegments = rest.split(', ');
  const sources = [];
  for (let i = 0; i < sourceSegments.length; i += 1) {
    const segment = sourceSegments[i];
    const amount = Number(segment[0]);
    let source = amount === 1 ? segment.slice(2) : segment.slice(2, -1);

    if (i === sourceSegments.length - 1)
      source = source.slice(0, -1);

    sources.push(source);
  }
  return {
    destination,
    sources
  };
};


solve().then(console.log); // 101
