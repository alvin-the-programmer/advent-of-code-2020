const fs = require('fs').promises;

const readLines = async () => {
  const data = await fs.readFile('./input', {encoding: 'utf-8'});
  return data.split('\n');
};

const solve = async () => {
  const lines = await readLines();
  const equations = lines.map(line => line.split(' ').join(''));
  return equations.reduce((total, eq) => total + eval(leftPrioritize(eq)), 0);
};

const leftPrioritize = (equation) => {
  const tokenStartIdx = findLastTokenStart(equation);
  
  if (tokenStartIdx === 0) {
    if (equation.endsWith(')')) {
      return leftPrioritize(equation.slice(1, -1))
    } else {
      return equation;
    }
  }
  
  const operator = equation[tokenStartIdx - 1];
  equation[tokenStartIdx - 2] === ')'
  
  const leftHandSide = leftPrioritize(equation.slice(0, tokenStartIdx - 1));
  
  let rightHandSide;

  if (equation.endsWith(')')) {
    rightHandSide = leftPrioritize(equation.slice(tokenStartIdx + 1, - 1));
  } else {
    rightHandSide = equation.slice(tokenStartIdx);
  }
  
  return `(${leftHandSide})${operator}(${rightHandSide})`;
};

const findLastTokenStart = (str) => {
  if (str.endsWith(')')) {
    let open = 1;
    for (let i = str.length - 2; i >= 0; i -= 1) {
      const char = str[i];
      if (char === '(') {
        open -= 1;
      } else if (char === ')') {
        open += 1;
      }

      if (open === 0)
        return i;
    }
  } else {
    for (let i = str.length - 1; i >= 0; i -= 1) {
      const char = str[i];
      if ('+*'.includes(char)) {
        return i + 1;
      }
    }
    return 0;
  }
}

solve().then(console.log); // 5374004645253