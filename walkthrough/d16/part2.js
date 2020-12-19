const fs = require('fs').promises;

const readLines = async () => {
  const data = await fs.readFile('./input', {encoding: 'utf-8'});
  return data.split('\n\n');
};

const solve = async () => {
  const [ sectionA, sectionB, sectionC ] = await readLines();
  const rules = parseA(sectionA);
  const nearbyTickets = parseC((sectionC));
  const validTickets = getValidRows(nearbyTickets, rules);
  const columns = transpose(validTickets);
  const possible = [];

  for (let num = 0; num < columns.length; num += 1) {
    const column = columns[num];

    const set = new Set();
    for (let field in rules) {
      const rule = rules[field];
      const isCompatible = column.every(val => rule(val));
      if (isCompatible)
        set.add(field);
    }
    possible[num] = set;
  }

  const map = {};
  while (Object.keys(map).length < columns.length) {
    for (let col = 0; col < possible.length; col += 1) {
      const set = possible[col];
      if (set.size === 1) {
        const label = [...set][0];
        map[label] = col;

        for (let otherSet of possible) {
          otherSet.delete(label);
        }
      }
    }
  }
  console.log(map);
  const myTicket = parseB(sectionB);
  console.log(myTicket)

  let product = 1;
  for (let field in map) {
    if (field.startsWith('departure')) {
      const colNum = map[field];
      product *= myTicket[colNum];
    }
  }

  return product;
};

const parseB = (section) => {
  const ticketStr = section.split('\n')[1];
  return ticketStr.split(',').map(Number);
}

const transpose = (grid) => {
  const newGrid = Array(grid[0].length)
    .fill()
    .map(() => []);

  for (let r = 0; r < grid.length; r += 1) {
    for (let c = 0; c < grid[0].length; c += 1) {
      newGrid[c][r] = grid[r][c];
    }
  }
  return newGrid;
};

const getValidRows = (rows, rules) => {
  const allRules = Object.values(rules);
  return rows.filter(row => {
    return !row.some(val => allRules.every(rule => rule(val) === false));
  });
};

const parseA = (section) => {
  const lines = section.split('\n');
  const rules = {};

  for (let line of lines) {
    const [ field, rangeStr ] = line.split(': ');
    const [ range1, range2 ] = rangeStr.split(' or ');
    const numbers1 = range1.split('-').map(Number);
    const numbers2 = range2.split('-').map(Number);
    rules[field] = (val) => {
      return numbers1[0] <= val && val <= numbers1[1] || numbers2[0] <= val && val <= numbers2[1];
    };
  }

  return rules;
};

const parseC = (section) => {
  const lines = section.split('\n').slice(1);
  return lines.map(line => line.split(',').map(Number));
};



solve().then(console.log); // 517827547723
