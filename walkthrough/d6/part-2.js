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
    let intersectionSet = new Set(lines[0]);
    for (let line of lines) {
      const lineSet = new Set(line);
      intersectionSet = intersection(intersectionSet, lineSet);
    }
    total += intersectionSet.size;
  }
  return total;
};


const intersection = (set1, set2) => {
  const newSet = new Set();

  for (let item of set1) {
    if (set2.has(item)) {
      newSet.add(item);
    }
  }

  return newSet;
};


solve().then(console.log); // 3050