const fs = require('fs').promises;

const readLines = async () => {
  const data = await fs.readFile('./input', {encoding: 'utf-8'});
  // const data = await fs.readFile('./example', {encoding: 'utf-8'});
  return data.split('\n');
};

const solve = async () => {
  const lines = await readLines();
  const foods = lines.map(parseLine);
  const possible = {};
  for (let food of foods) {
    for (let allergen of food.allergens) {
      if (allergen in possible) {
        possible[allergen] = intersection(possible[allergen], food.ingredients);
      } else {
        possible[allergen] = food.ingredients;
      }
    }
  }

  const allergicIngredients = new Set();
  for (let set of Object.values(possible)) {
    for (let ingredient of set) {
      allergicIngredients.add(ingredient);
    }
  }

  const actual = {};

  while (Object.keys(actual).length < Object.keys(possible).length) {
    for (let allergen in possible) {
      const set = possible[allergen];
      if (set.size === 1) {
        const ingredient = [...set][0];
        actual[allergen] = ingredient;
        for (let otherSet of Object.values(possible)) {
          otherSet.delete(ingredient);
        }
      }
    }
  }

  return Object.keys(actual).sort().map(allergen => actual[allergen]).join(',');
};

const intersection = (s1, s2) => {
  const intersect = new Set();
  for (let item of s1) {
    if (s2.has(item)) {
      intersect.add(item);
    }
  }
  return intersect;
};

const parseLine = (line) => {
  const [ seg1, seg2 ] = line.split(' (contains ');
  const ingredients = new Set(seg1.split(' '));
  const allergens = seg2.slice(0, -1).split(', ');
  return { ingredients, allergens };
};

solve().then(console.log);
