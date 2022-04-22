const fs = require('fs');

const data = fs.readFileSync('companys.json', 'utf8');
const companys = JSON.parse(data);
console.log(companys.length);