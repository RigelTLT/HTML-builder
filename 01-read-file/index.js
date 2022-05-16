const fs = require('fs');
const path = require('path');
const read = fs.createReadStream(path.join(__dirname, 'text1.txt'), 'utf-8');
read.on('data', (data) => {
    console.log(data);
})
read.on('error', (err) => {
    if (err) throw err;
})