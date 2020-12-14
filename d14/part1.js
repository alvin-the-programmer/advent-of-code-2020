const { memory } = require('console');

const fs = require('fs').promises;

const readLines = async () => {
  const data = await fs.readFile('./input', {encoding: 'utf-8'});
  return data.split('\n');
};

const solve = async () => {
  const lines = await readLines();
  const commands = lines.map(parseCommand);
 
  const table = {};

  let mask = null;
  for (let command of commands) {
    const { type, value, address } = command;
    if (type === 'mask') {
      mask = value;
    } else {
      if (!(address in table))
        table[address] = ''.padStart(36, '0');
      table[address] = applyMask(value, mask);
    }
  }
  console.log(table)
  return Object
    .values(table)
    .map((bin) => parseInt(bin, 2))
    .reduce((a, b) => a + b);
};

const applyMask = (value, mask) => {
  let maskedValue = '';
  for (let i = 0; i < value.length; i += 1) {
    const valueChar = value[i];
    const maskChar = mask[i];
    if (maskChar === '1' || maskChar === '0') {
      maskedValue += maskChar;
    } else {
      maskedValue += valueChar;
    }
  }
  return maskedValue;
};

const parseCommand = (line) => {
  const [ seg, val] = line.split(' = ');
  if (seg.slice(0, 3) === 'mas') {
    return { type: 'mask', value: val };
  } else {
    const open = seg.indexOf('[');
    const close = seg.lastIndexOf(']');
    return {
      type: 'mem',
      address: Number(seg.slice(open + 1, close)),
      value: Number(val).toString(2).padStart(36, '0')
    };
  }
};

solve().then(console.log);