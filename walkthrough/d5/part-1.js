const fs = require('fs').promises;

const readEntries = async () => {
  const data = await fs.readFile('./input', {encoding: 'utf-8'});
  return data.split('\n');
};

const solve = async () => {
  const lines = await readEntries();
  const seatIds = lines.map(line => {
    const rowStr = line.slice(0, 7);
    const colStr = line.slice(7);
    const rowNum = binaryFind(rowStr, 'F', 'B', 128);
    const colNum = binaryFind(colStr, 'L', 'R', 8);
    return (8 * rowNum) + colNum;
  });

  return Math.max(...seatIds);
};

const binaryFind = (str, bottomSym, topSym, n) => {
  let lo = 0;
  let hi = n;
  for (let char of str) {
    const mid = Math.floor((lo + hi) / 2);
    if (char === bottomSym) {
      // take the lower half
      hi = mid;
    } else if (char === topSym) {
      // take the upper half
      lo = mid;
    }
  }
  return lo;
};

solve().then(console.log); // 806