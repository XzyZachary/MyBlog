import Path from 'path'
import fs from 'fs'

export default opts => {
    let {
        app,
        rules = []
    } = opts

    if(!app){
        throw new Error('the app params is necessary')
    }

    app.router = {};

    const appKeys = Object.keys(app)
    rules.forEach((item) => {
        let {
            path,
            name
        } = item
        if(appKeys.includes(name)){
            throw new Error(`the name of ${name} already exists!`)
        }
        let content = {};
        fs.readdirSync(path).forEach(filename => {
            let extname = Path.extname(filename);
            if (extname === '.js'){
                let name = Path.basename(filenaem, extname)
                content[name] = require(Path.join(path, filename))
                content[name].filename = name
            }
        })
        app[name] = content
    })
}