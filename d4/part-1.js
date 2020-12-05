const fs = require('fs').promises;

const readEntries = async () => {
  const data = await fs.readFile('./input', {encoding: 'utf-8'});
  return data.split('\n\n');
};

const solve = async () => {
  const entries = await readEntries();
  const rows = entries.map(parseEntry);
  const requiredKeys = [
    'ecl',
    'iyr',
    'hgt',
    'eyr',
    'pid',
    'byr',
    'hcl'
  ];

  let numValid = 0;
  for (let row of rows) {
    const isValid = requiredKeys.every(key => key in row);
    if (isValid)
      numValid += 1;
  }
  return numValid
};

const parseEntry = (entry) => {
  const data = {};
  const fields = entry.split(/\s/);

  for (let field of fields) {
    const [ key, val ] = field.split(':');
    data[key] = val;
  }
  return data;
};

solve().then(console.log); // 226