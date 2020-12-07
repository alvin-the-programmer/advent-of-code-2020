const fs = require('fs').promises;

const readEntries = async () => {
  const data = await fs.readFile('./input', {encoding: 'utf-8'});
  return data.split('\n');
};

const solve = async () => {
  const lines = await readEntries();
  const ids = lines.map(getSeatId);
  const sortedIds = ids.sort((a, b) => a - b);
  for (let i = 1; i < sortedIds.length - 1; i++) {
    const curr = sortedIds[i];
    const next = sortedIds[i + 1];
    if (curr + 1 !== next) {
      return curr + 1;
    }
  }
};

const getSeatId = (str) => {
  const rowInfo = str.slice(0, 7);
  const colInfo = str.slice(7);
  const row = binaryFind(rowInfo, 'B', 'F', 128);
  const col = binaryFind(colInfo, 'R', 'L', 8);
  return (row * 8) + col;
};

const binaryFind = (str, topSymbol, bottomSymbol, number) => {
  let lo = 0;
  let hi = number;
  for (let char of str) {
    const mid = Math.floor((lo + hi) / 2);
    if (char === bottomSymbol) {
      hi = mid;
    } else if (char === topSymbol) {
      lo = mid;
    }
  }

  return lo;
};

solve().then(console.log); // 562