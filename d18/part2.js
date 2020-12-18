const fs = require('fs').promises;

const readLines = async () => {
  const data = await fs.readFile('./input', {encoding: 'utf-8'});
  return data.split('\n');
};

const solve = async () => {
  const lines = await readLines();
  const equations = lines.map(line => line.split(' ').join(''));
  return equations.reduce((total, eq) => total + eval(additionPrioritize(eq)), 0);
};

const additionPrioritize = (equation) => {
  let leftPad = '';
  let rightPad = '';

  for (let ch of equation) {
    if (ch === '*') {
      leftPad += '(';
      rightPad += ')';
    }
  }

  const demotedMultiply = equation.split('*').join(')*(');
  return leftPad + demotedMultiply + rightPad;
};

solve().then(console.log); // 88782789402798