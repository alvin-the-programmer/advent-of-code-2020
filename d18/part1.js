const fs = require('fs').promises;

const readLines = async () => {
  const data = await fs.readFile('./input', {encoding: 'utf-8'});
  return data.split('\n');
};

const solve = async () => {
  const lines = await readLines();
  const equations = lines.map(line => line.split(' ').join(''));
  return equations.reduce((total, eq) => total + evaluate(eq), 0);
};

const calculation = {
  '+': (a, b) => a + b,
  '*': (a, b) => a * b
};

const evaluate = (equation) => {
  let lastTokenIdx;
  let num;
  
  if (equation.endsWith(')')) {
    lastTokenIdx = lastParenIdx(equation);
    const containedEquation = equation.slice(lastTokenIdx + 1, -1);
    num = evaluate(containedEquation);
  } else {
    lastTokenIdx = lastNumIdx(equation);
    num = Number(equation.slice(lastTokenIdx));
  }

  if (lastTokenIdx === 0)
    return num;

  const op = equation[lastTokenIdx - 1];
  const calculate = calculation[op];
  const remainingEquation = equation.slice(0, lastTokenIdx - 1);
  const subResult = evaluate(remainingEquation);
  return calculate(num, subResult);
};

const lastNumIdx = (str) => {
  for (let i = str.length - 1; i >= 0; i -= 1) {
    const char = str[i];
    if (char === '+' || char === '*')
      return i + 1;
  }
  return 0;
};

const lastParenIdx = (str) => {
  let open = 1;
  for (let i = str.length - 2; i >= 0; i -= 1) {
    const char = str[i];
    if (char === ')') {
      open += 1;
    } else if (char === '(') {
      open -= 1;
    }

    if (open === 0)
      return i;
  }
};

solve().then(console.log);