let fs = require('fs');
console.log(JSON.parse(fs.readFileSync('./src/system.json','utf8')).version)

