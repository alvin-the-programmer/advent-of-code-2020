const fs = require('fs').promises;

const readEntries = async () => {
  const data = await fs.readFile('./input', {encoding: 'utf-8'});
  return data.split('\n\n');
};

const solve = async () => {
  const groups = await readEntries();
  let total = 0;
  for (let group of groups) {
    const lines = group.split('\n');
    let unionSet = new Set();
    for (let line of lines) {
      const lineSet = new Set(line);
      unionSet = union(unionSet, lineSet);
    }
    total += unionSet.size;
  }
  return total;
};


const union = (set1, set2) => {
  const newSet = new Set();

  for (let item of set1) {
    newSet.add(item);
  }

  for (let item of set2) {
    newSet.add(item);
  }

  return newSet;
};

solve().then(console.log); // 6416