const fs = require('fs').promises;

const readLines = async () => {
  const data = await fs.readFile('./input', {encoding: 'utf-8'});
  return data.split('\n\n');
};

const solve = async () => {
  const [ sectionA, sectionB, sectionC ] = await readLines();
  const fieldArray = parseSectionA(sectionA)
  const fields = fieldArray.reduce((obj, field) => ({ ...obj, [field.field]: field.ranges}), {});
  const myTicket = parseSectionB(sectionB);
  const nearbyTickets = parseSectionC(sectionC);
  const ranges = fieldArray.reduce((all, field) => [...all, ...field.ranges], []);

  const validTickets = [  ];
  for (let ticket of nearbyTickets) {
    const invalid = ticket.some(value => ranges.every(range => !(range[0] <= value && value <= range[1])))
    if (!invalid)
      validTickets.push(ticket);
  }

  const columns = transpose(validTickets);

  const available = [];

  for (let label in fields) {
    const ranges = fields[label];
    for (let j = 0; j < columns.length; j++) {
      const col = columns[j];
      const valid = col.every(val => {
        return ranges.some(range => {
          const [ min, max ] = range;
          return min <= val && val <= max;
        });
      })
      
      if (valid) {
        if (!(j in available))
          available[j] = new Set()
        available[j].add(label);
      }
    }
  }

  
  const bijection = {};
  let size = 0
  while (size < available.length) {
    console.log(available);
    for (let colNum = 0; colNum < available.length; colNum += 1) {
      const candidates = available[colNum];
      if (candidates.size === 1) {
        const field = [...candidates][0];
        bijection[field] = colNum;
        size += 1;
        for (let set of available)
          set.delete(field);
      }
    }
  }

  let product = 1;
  for (let field in bijection) {
    if (field.startsWith('departure')) 
      product *= myTicket[bijection[field]];
  }
  return product;
};

const transpose = (grid) => {
  const newGrid = Array(grid[0].length).fill().map(() => []);

  for (let i = 0; i < grid.length; i += 1) {
    for (let j = 0; j < grid[0].length; j += 1) {
      newGrid[j][i] = grid[i][j];
    }
  }

  return newGrid;
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

const parseSectionB = (section) => {
  const [ header, ticketStr ] = section.split('\n');
  return ticketStr.split(',').map(Number)
};

const parseSectionC = (section) => {
  const lines = section.split('\n').slice(1);
  return lines.map(line => line.split(',').map(Number));
};

solve().then(console.log);  // 517827547723
