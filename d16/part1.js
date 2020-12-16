const fs = require('fs').promises;

const readLines = async () => {
  const data = await fs.readFile('./input', {encoding: 'utf-8'});
  return data.split('\n\n');
};

const solve = async () => {
  const [ sectionA, sectionB, sectionC ] = await readLines();
  const fields = parseSectionA(sectionA)
  const nearbyTickets = parseSectionC(sectionC);
  const nearbyValues = nearbyTickets.flat()
  const ranges = fields.reduce((all, field) => [...all, ...field.ranges], []);
  
  let errorSum = 0;

  for (let value of nearbyValues) {
    const invalid = ranges.every(range => !(range[0] <= value && value <= range[1]));
    if (invalid)
      errorSum += value;
  }

  return errorSum;
};

const parseSectionA = (section) => {
  const lines = section.split('\n');

  const parseLine = (line) => {
    const [ field, rangeStr ] = line.split(': ');
    const [rangeStrA, rangeStrB] = rangeStr.split(' or ');
    const rangeA = rangeStrA.split('-').map(Number);
    const rangeB = rangeStrB.split('-').map(Number);
    return { field, ranges: [rangeA, rangeB] };
  };

  return lines.map(parseLine);
};

const parseSectionC = (section) => {
  const lines = section.split('\n').slice(1);
  return lines.map(line => line.split(',').map(Number));
};


solve().then(console.log); 
