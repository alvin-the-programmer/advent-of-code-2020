const fs = require('fs').promises;

const readLines = async () => {
  const data = await fs.readFile('./input', {encoding: 'utf-8'});
  return data.split('\n');
};

const CARDINALS = new Set(['N', 'S', 'E', 'W']);

const solve = async () => {
  const lines = await readLines();
  const commands = lines.map(parseCommand);
  const cardinalCommands = commands.filter(command => CARDINALS.has(command.type));
  const radialCommands = commands.filter(command => !CARDINALS.has(command.type));
  const cardinalDelta = calculateCardinalDistance(cardinalCommands);
  const radialDelta = calculateRadialDistance(radialCommands);
  return Math.abs(cardinalDelta.x + radialDelta.x) + Math.abs(cardinalDelta.y + radialDelta.y);
};

const calculateRadialDistance= (commands) => {
  let x = 0;
  let y = 0;
  let angle = 90; // point East
  for (let command of commands) {
    const { type, val } = command;
    if (type === 'L') {
      angle = (360 + angle - val) % 360;
    } else if (type === 'R') {
      angle = (angle + val) % 360;
    } else {
      if (angle === 0) {
        y += val;
      } else if(angle === 180) {
        y -= val;
      } else if (angle === 90) {
        x += val;
      } else if (angle === 270) {
        x -= val;
      }
    }
  }
  return { x, y };
};

const calculateCardinalDistance = (commands) => {
  let x = 0;
  let y = 0;
  for (let command of commands) {
    const { type, val } = command;
    if (type === 'N') {
      y += val;
    } else if (type === 'S') {
      y -= val;
    } else if (type === 'E') {
      x += val;
    } else if (type === 'W') {
      x -= val;
    }
  }
  return { x, y };
};

const parseCommand = (line) => {
  return {
    type: line[0],
    val: Number(line.slice(1))
  };
}

solve().then(console.log); // 1148