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
      const floatAddress = applyMask(address, mask);
      const targetAddresses = getAddresses(floatAddress);
      for (let targetAddress of targetAddresses) {
        table[targetAddress] = value;
      }
    }
  };

  return Object
    .values(table)
    .reduce((a, b) => a + b);
};

const applyMask = (address, mask) => {
  let maskedAddress = '';
  for (let i = 0; i < address.length; i += 1) {
    const addressChar = address[i];
    const maskChar = mask[i];
    if (maskChar === '0') {
      maskedAddress += addressChar;
    } else if (maskChar === '1') {
      maskedAddress += maskChar;
    } else {
      maskedAddress += 'X';
    }
  }
  return maskedAddress;
};

const getAddresses = (floatAddress) => {
  if (floatAddress === '')
    return [''];
  const firstChar = floatAddress[0];
  const rest = floatAddress.slice(1);
  const partialAddresses = getAddresses(rest);
  if (firstChar === 'X') {
    const withZero = partialAddresses.map(address => '0' + address);
    const withOne = partialAddresses.map(address => '1' + address);
    return [ ...withZero, ...withOne ];
  } else {
    return partialAddresses.map(address => firstChar + address);
  }
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
      address: Number(seg.slice(open + 1, close)).toString(2).padStart(36, '0'),
      value: Number(val)
    };
  }
};

solve().then(console.log);