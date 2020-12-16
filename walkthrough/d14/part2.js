
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
      const floatingAddress = getFloating(address, mask);
      const addresses = getAddresses(floatingAddress);
      for (let addr of addresses) {
        memory[addr] = value;
      }
    }
  }

  const values = Object.values(memory);
  return values.reduce((a, b) => a + b);
};

const getFloating = (address, mask) => {
  let newAddress = '';
  for (let i = 0; i < address.length; i += 1) {
    if (mask[i] === '0') {
      newAddress += address[i];
    } else {
      newAddress += mask[i];
    }
  }
  return newAddress;
};

const getAddresses = (floatingAddress) => {
  if (floatingAddress.length === 0)
    return [''];
  
  const firstChar = floatingAddress[0];
  const restAddress = floatingAddress.slice(1);
  const partialAddresses = getAddresses(restAddress);
  if (firstChar === 'X') {
    return [
      ...partialAddresses.map(addr => '0' + addr),
      ...partialAddresses.map(addr => '1' + addr)
    ]
  } else {
    return partialAddresses.map(addr => firstChar + addr);
  }
};


const parseCommand = (line) => {
  const [ seg1, seg2 ] = line.split(' = ');
  if (seg1.slice(0,3) === 'mem') {
    const openBracket = seg1.indexOf('[');
    const closeBracket = seg1.indexOf(']');

    return {
      type: 'mem',
      address: Number(seg1.slice(openBracket + 1, closeBracket)).toString(2).padStart(36, '0'),
      value: Number(seg2)
    }
  } else {
    return {
      type: 'mask',
      value: seg2
    }
  }
};


solve().then(console.log); // // 4330547254348