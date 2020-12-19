const fs = require('fs').promises;

const readLines = async () => {
  const data = await fs.readFile('./input', {encoding: 'utf-8'});
  return data.split('\n\n');
};

const solve = async () => {
  const [ sectionA, sectionB, sectionC ] = await readLines();
  const rules = parseA(sectionA);
  const nearbyTickets = parseC((sectionC));
  const allRules = Object.values(rules);
  const values = nearbyTickets.flat();
  let errorTotal = 0;
  for (let val of values) {
    const isInvalid = allRules.every(rule => rule(val) === false);
    if (isInvalid)
      errorTotal += val;
  }

  return errorTotal
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



solve().then(console.log); // 29019
