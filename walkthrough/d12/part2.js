const fs = require('fs').promises;

const readLines = async () => {
  const data = await fs.readFile('./input', {encoding: 'utf-8'});
  return data.split('\n');
};

const solve = async () => {
  const lines = await readLines();
  const commands = lines.map(parseCommand);
  const { x, y } = calc(commands);
  return Math.abs(x) + Math.abs(y);
};

const calc = (commands) => {
  const ship = { x: 0, y: 0 };
  let waypoint = { x: 10, y: 1 };
  for (let command of commands) {
    const { type, val } = command;
    if (type === 'N') {
      waypoint.y += val;
    } else if (type === 'S') {
      waypoint.y -= val;
    } else if (type === 'E') {
      waypoint.x += val;
    } else if (type === 'W') {
      waypoint.x -= val;
    } else if (type === 'L') {
      const angle = degreeToRadians(val);
      waypoint = rotatePoint(waypoint, angle);
    } else if (type === 'R') {
      const angle = degreeToRadians(val);
      waypoint = rotatePoint(waypoint, -angle);
    } else {
      ship.x += waypoint.x * val;
      ship.y += waypoint.y * val;
    }
  }
  return ship;
};

const rotatePoint = (point, angle) => {
  const { x, y } = point;
  const newX = Math.round((x * Math.cos(angle)) - (y * Math.sin(angle)));
  const newY = Math.round((y * Math.cos(angle)) + (x * Math.sin(angle)));
  return { x: newX, y: newY }
};

const degreeToRadians = (deg) => deg * (Math.PI / 180);


const parseCommand = (line) => {
  const type = line[0];
  const val = Number(line.slice(1));
  return { type, val };
};

solve().then(console.log); // 52203