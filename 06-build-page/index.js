const fs = require('fs');
const path = require('path');
let text = '';
fs.mkdir(path.join(__dirname, 'project-dist'), { recursive: true }, (err) =>{
    if(err) return console.error(err);
});
    fs.copyFile(path.join(__dirname, 'template.html'), path.join(__dirname, "project-dist", 'index.html'), fs.constants.COPYFILE_FICLONE, (err)=>{
        if(err) throw err;    
    });
    fs.readFile(path.join(__dirname, "project-dist", 'index.html'), "utf8", 
                function(error,data){
                    if(error) throw error;     
                    text = data;
                    fs.readdir(path.join(__dirname, "components"), (err, dir) => {
                        if (err) throw err;
                        dir.forEach((componentsFiles) => {
                            fs.readFile(path.join(__dirname, "components", componentsFiles), "utf8", 
                    (error,data)=>{
                        const extname = path.extname(path.join(__dirname, "components", componentsFiles));
                        const name = path.basename(
                          path.join(__dirname, "secret-folder", componentsFiles),
                          extname
                        );
                        
                        text = text.replace(`{{${name}}}`, data);
                        fs.writeFile(path.join(__dirname, "project-dist", 'index.html'), text, ()=>{}); 
                    })
                    });
                    });
    });
    
    fs.mkdir(path.join(__dirname, "project-dist", "assets"), { recursive: true }, (err) =>{
        if(err) return console.error(err);
    });
    fs.readdir(path.join(__dirname, "assets"), (err, assets) => {
        if (err) throw err;
        assets.forEach((assetsDir) => {
            fs.mkdir(path.join(__dirname, 'project-dist',"assets", assetsDir), { recursive: true }, (err) =>{
                if(err) return console.error(err);
            });
            fs.readdir(path.join(__dirname, "assets", assetsDir), (err, dir) => {
                if (err) throw err;
                dir.forEach((assetsFiles) => {
            fs.copyFile(path.join(__dirname, "assets", assetsDir, assetsFiles), path.join(__dirname, "project-dist", "assets", assetsDir, assetsFiles), fs.constants.COPYFILE_FICLONE, (err)=>{
                if(err) return console.error(err);
            });
            });
        });
      });
    });
    const style = path.join(__dirname, 'project-dist', 'style.css');
    const writeStyle = fs.createWriteStream(style);
    fs.readdir(path.join(__dirname, 'styles'), (err, data)=>{
        if (err) throw err;
        data.forEach((files) => {
            const extname = path.extname(path.join(__dirname, "styles", files));
            if(extname === '.css'){
            const readText = fs.createReadStream(path.join(__dirname, 'styles', files), 'utf8');
            readText.on('data', (readdata) => {
                fs.appendFile(style, readdata, ()=>{
                })
            })}
        })
    })
