const fs = require('fs').promises;

const readLines = async () => {
  const data = await fs.readFile('./input', {encoding: 'utf-8'});
  return data.split('\n');
};

const solve = async () => {
  const lines = await readLines();
  const commands = lines.map(parseCommand);
  const { x, y } = calculateDelta(commands);
  return Math.abs(x) + Math.abs(y);
};

const calculateDelta = (commands) => {
  const ship = {
    x: 0,
    y: 0
  };

  let waypoint = {
    x: 10,
    y: 1
  };

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
      waypoint = rotatePoint(waypoint, val);
    } else if (type === 'R') {
      waypoint = rotatePoint(waypoint, -val);
    } else {
      ship.x += waypoint.x * val;
      ship.y += waypoint.y * val; 
    }
  }

  return ship;
};

const rotatePoint = (point, degrees) => {
  const radians = degreesToRadians(degrees);
  const cos = Math.cos(radians);
  const sin = Math.sin(radians);
  return {
    x: Math.round(point.x * cos - point.y * sin),
    y: Math.round(point.y * cos + point.x * sin)
  };
};

const degreesToRadians = (n) => n * Math.PI / 180;

const parseCommand = (line) => {
  return {
    type: line[0],
    val: Number(line.slice(1))
  };
};

solve().then(console.log); // 52203