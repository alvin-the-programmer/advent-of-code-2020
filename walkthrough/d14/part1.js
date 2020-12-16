
const fs = require('fs').promises;

const readLines = async () => {
  const data = await fs.readFile('./input', {encoding: 'utf-8'});
  return data.split('\n');
};

const solve = async () => {
  const lines = await readLines();
  const commands = lines.map(parseCommand);
  const memory = {};
  let mask = null;
  for (let command of commands) {
    const { type, value, address } = command;
    if (type === 'mask') {
      mask = value;
    } else {
      const maskedValue = applyMask(value, mask);
      memory[address] = maskedValue;
    }
  }
  const base10Values = Object.values(memory).map(bin => parseInt(bin, 2));
  return base10Values.reduce((a, b) => a + b);
};

const applyMask = (value, mask) => {
  let newValue = '';
  for (let i = 0; i < value.length; i += 1) {
    if (mask[i] === 'X') {
      newValue += value[i];
    } else {
      newValue += mask[i];
    }
  }

  return newValue;
};

const parseCommand = (line) => {
  const [ seg1, seg2 ] = line.split(' = ');
  if (seg1.slice(0,3) === 'mem') {
    const openBracket = seg1.indexOf('[');
    const closeBracket = seg1.indexOf(']');

    return {
      type: 'mem',
      address: seg1.slice(openBracket + 1, closeBracket),
      value: Number(seg2).toString(2).padStart(36, '0')
    }
  } else {
    return {
      type: 'mask',
      value: seg2
    }
  }
}


solve().then(console.log); // 11926135976176