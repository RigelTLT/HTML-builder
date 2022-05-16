const fs = require('fs');
const path = require('path');
const { stdout, stdin } = require('process');
const write = fs.createWriteStream(path.join(__dirname, 'text.txt'));
stdout.write('Введите текст для записи\n');
stdin.on('data', function(data) {
    fs.appendFile(path.join(__dirname, 'text.txt'),
    data,
    () => {
        let test = data.toString();
        if(test.trim() === 'exit'){
            process.exit();
        }else{
            console.log('Добавьте еще текст');
        }
    })
})
process.on('SIGINT', () =>{
    process.exit();
})
process.on('exit', () =>{
    stdout.write('Hasta la vista, baby');
})
