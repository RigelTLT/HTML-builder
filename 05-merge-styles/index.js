const fs = require('fs');
const path = require('path');
let text = '';
const bundle = path.join(__dirname, 'project-dist', 'bundle.css');
const writeBundle = fs.createWriteStream(bundle);
fs.readdir(path.join(__dirname, 'styles'), (err, data)=>{
    if (err) throw err;
    fs.writeFile(bundle, text, ()=>{});
    data.forEach((files) => {
        const extname = path.extname(path.join(__dirname, "styles", files));
        if(extname === '.css'){
        const readText = fs.createReadStream(path.join(__dirname, 'styles', files), 'utf8');
        readText.on('data', (readdata) => {
            fs.appendFile(bundle, readdata, ()=>{
            })
        })}
    })
})

