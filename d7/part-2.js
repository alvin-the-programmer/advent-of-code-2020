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
    graph[destination] = sources;
  }
  console.log(graph);
  return traverse(graph, 'shiny gold bag') - 1;
};

const traverse = (graph, node) => {
  let totalBags = 1;
  for (let neighbor in graph[node]) {
    const qty = graph[node][neighbor];
    totalBags += qty * traverse(graph, neighbor);
  }
  return totalBags;
};

const parseLine = (line) => {
  const [ destination, rest ] = line.split('s contain ');
  if (rest.slice(0, 3) === 'no ') {
    return {
      destination,
      sources: []
    };
  }

  const sourceSegments = rest.split(', ');
  const sources = {};
  for (let i = 0; i < sourceSegments.length; i += 1) {
    const segment = sourceSegments[i];
    const amount = Number(segment[0]);
    let source = amount === 1 ? segment.slice(2) : segment.slice(2, -1);
    if (i === sourceSegments.length - 1)
      source = source.slice(0, -1);

    sources[source] = amount;
  }

  return {
    destination,
    sources
  };
};




solve().then(console.log);