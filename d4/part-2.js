const fs = require('fs').promises;

const readEntries = async () => {
  const data = await fs.readFile('./input', {encoding: 'utf-8'});
  return data.split('\n\n');
};


const validateByr = (data) => {
  return validateRange(data, 'byr', 1920, 2002);
};

const validateIyr = (data) => {
  return validateRange(data, 'iyr', 2010, 2020);
};

const validateEyr = (data) => {
  return validateRange(data, 'eyr', 2020, 2030);
};

const validateRange = (data, field, min, max) => {
  if (data[field] === undefined)
    return false;
  
  const value = Number(data[field]);
  return min <= value && value <= max;
}

const validateHgt = (data) => {
  if (data.hgt === undefined)
    return false;
  const unit = data.hgt.slice(-2);
  const value = Number(data.hgt.slice(0, -2));
  if (unit === 'cm') {
    return 150 <= value && value <= 193;
  } else if (unit === 'in') {
    return 59 <= value && value <= 76;
  } else {
    return false;
  }
};

const validateHcl = (data) => {
  if (data.hcl === undefined)
    return false;
  return data.hcl.match(/^#([0-9a-f]{6})$/) !== null;
};

const validateEcl = (data) => {
  const colors = new Set(['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth']);
  return colors.has(data.ecl);
};

const validatePid = (data) => {
  if (data.pid === undefined)
    return false;
  return data.pid.match(/^([0-9]{9})$/) !== null;
};

const parseEntry = (entry) => {
  const data = {};
  const fields = entry.split(/\s/);

  for (let field of fields) {
    const [ key, val ] = field.split(':');
    data[key] = val;
  }
  return data;
};

const solve = async () => {
  const entries = await readEntries();
  const rows = entries.map(parseEntry);
  const validators = [
    validateByr,
    validateIyr,
    validateEyr,
    validateHgt,
    validateHcl,
    validateEcl,
    validatePid
  ];

  let numValid = 0;
  for (let row of rows) {
    const isValid = validators.every(validate => validate(row));
    if (isValid)
      numValid += 1;
  }
  return numValid
};

solve().then(console.log); // 160