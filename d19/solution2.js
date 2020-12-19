const fs = require('fs').promises;

const readLines = async () => {
  const data = await fs.readFile('./input2', {encoding: 'utf-8'});
  return data.split('\n\n');
};

const solve = async () => {
  const [ sectionA, sectionB ] = await readLines();
  const ruleSet = parseRules(sectionA);
  const messages = sectionB.split('\n');

  const r0 = makeRegexStr(ruleSet, 0, 15);

  const regExp0 = new RegExp(`^${r0}$`)

  let count = 0;
  for (let message of messages) {
    if (regExp0.test(message))
      count += 1;
  }

  return count;
};

const makeRegexStr = (ruleSet, root, maxDepth) => {
  const nested = substitute(ruleSet, String(root), maxDepth);
  const expression = JSON.stringify(nested)
    .split('"').join('')
    .split(',').join('')
    .split('[').join('(')
    .split(']').join(')');
  return expression;
};

const substitute = (ruleSet, num='0', maxDepth) => {
  if (maxDepth === 0) // ♫ because I'm in too deep... and I'm trying to not overflow ♫
    return "X";
  
  let rule = ruleSet[num];
  
  if (isString(rule))
    return rule;

  const result = [];

  for (let clause of rule) {
    const bracket = clause.map(num => substitute(ruleSet, num, maxDepth - 1))
    result.push(bracket, '|');
  }

  return result.slice(0,-1);
};

const parseRules = (section) => {
  const lines = section.split('\n');
  const rules = {};
  for (let line of lines) {
    const [ruleNum, pipeString] = line.split(': ');
    if (pipeString.startsWith('"')) {
      rules[ruleNum] = pipeString[1];
    } else {
      const clauseStrings = pipeString.split(' | ');
      const clauses = clauseStrings.map(s => s.split(' '));
      rules[ruleNum] = clauses;
    }
  }
  return rules;
};

const isString = (val) => typeof val === 'string';

solve().then(console.log); // 339
