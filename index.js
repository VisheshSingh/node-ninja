console.log(__dirname);
console.log(__filename);

const { people, ages } = require('./people');

console.log(people, ages);

const os = require('os');
console.log(os.platform(), os.homedir());
