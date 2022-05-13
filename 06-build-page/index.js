const fs = require('fs');
const path = require('path');
let text = '';
fs.mkdir(path.join(__dirname, 'project-dist'), { recursive: true }, (err) =>{
    if(err) return console.error(err);
});
const project = path.join(__dirname, 'project-dist');
function cleanProject(project){
    fs.readdir(project, (err, data) =>{
        if (err) return console.error(err);
        if(data){
            data.forEach((element) =>{
                fs.stat(path.join(project, element), (err, file) => {
                    if (err) throw err;
                    if (file.isFile()) {
                        fs.unlink(path.join(project, element), (err) =>{
                            if(err) return console.error(err);
                        })
                    }
                    else{
                        cleanProject(path.join(project, element));
                    }
                  });
            })
        }
    })
}
cleanProject(project);
fs.copyFile(path.join(__dirname, 'template.html'), path.join(__dirname, "project-dist", 'index.html'), fs.constants.COPYFILE_FICLONE, (err)=>{
    if(err) return console.error(err);
});
fs.readFile(path.join(__dirname, "project-dist", 'index.html'), "utf8", 
            function(error,data){
                if(error) throw error; 
               
                fs.readFile(path.join(__dirname, "components", 'header.html'), "utf8", 
            (error,header)=>{
                if(error) throw error; 
                text = data.replace('{{header}}', header);
                fs.readFile(path.join(__dirname, "components", 'articles.html'), "utf8", 
                (error,articles)=>{
                    if(error) throw error; 
                    text = text.replace('{{articles}}', articles);
                    fs.readFile(path.join(__dirname, "components", 'footer.html'), "utf8", 
                    (error,footer)=>{
                        if(error) throw error; 
                        text = text.replace('{{footer}}', footer);
                        fs.writeFile(path.join(__dirname, "project-dist", 'index.html'), text, ()=>{}); 
        });          
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