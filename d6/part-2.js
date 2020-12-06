const fs = require('fs').promises;

const readEntries = async () => {
  const data = await fs.readFile('./input', {encoding: 'utf-8'});
  return data.split('\n\n');
};

const solve = async () => {
  const groups = await readEntries();

  let total = 0;
  for (let group of groups) {
    const commonChars = getCommonChars(group);
    total += commonChars.size;
  }
  return total;
};

const getCommonChars = (group) => {
  const people = group.split('\n');
  return people.reduce((acc, str) => {
    const curr = new Set(str);
    return union(acc, curr);
  }, new Set(people[0]));
};

const union = (s1, s2) => {
  const newSet = new Set();
  for (let item of s1) {
    if (s2.has(item))
      newSet.add(item);
  }
  return newSet;
};


solve().then(console.log);