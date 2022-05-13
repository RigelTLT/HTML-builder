const fs = require("fs");
const path = require("path");

fs.mkdir(path.join(__dirname, 'files-copy'), { recursive: true }, (err) =>{
    if(err) return console.error(err);
    console.log('Directory created successfully!');
});
fs.readdir(path.join(__dirname, 'files-copy'), (err, data) =>{
    if (err) return console.error(err);
    if(data){
        data.forEach((element) =>{
            fs.unlink(path.join(__dirname, 'files-copy', element), (err) =>{
                if(err) return console.error(err);
            })
        })
    }
})
fs.readdir(path.join(__dirname, "files"), (err, data) => {
    if (err) throw err;
    data.forEach((files) => {
        fs.copyFile(path.join(__dirname, "files", files), path.join(__dirname, "files-copy", files), fs.constants.COPYFILE_FICLONE, (err)=>{
            if(err) return console.error(err);
        });
    });
    console.log('Files copy successfully!');
  });