const fs = require('fs').promises;

const readEntries = async () => {
  const data = await fs.readFile('./input', {encoding: 'utf-8'});
  return data.split('\n\n');
};

const solve = async () => {
  const groups = await readEntries();
  let total = 0;
  for (let group of groups) {
    const uniqueChars = new Set(group);
    uniqueChars.delete('\n');
    total += uniqueChars.size;
  }
  return total;
};


solve().then(console.log);