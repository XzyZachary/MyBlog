import Busboy from 'busboy'
import fs from 'fs'
import path from 'path'
import conf from '../../config'

//检查文件 无则创建
const mkdirSync = dirname => {
    if(fs.existsSync(dirname)){
        return true
    }else {
        if(mkdirSync(path.dirname(dirname))){
            fs.mkdirSync(dirname)
            return true
        }
    }
}

export const uploadFile = (ctx, opts) => {
    function rename (fileName){
        return Math.random().toString(16).substr(2) +'.'+fileName.split('.').pop()
    }

    console.log(ctx.req.headers)
    let busboy = new Busboy({headers: ctx.req.heaeders})
    console.log('start uploading....')

    return new Promise((resolve, reject) => {
        var fileObj = {}
        busbooy.on('file', async (fieldname, file, filename, encoding, mimetype) => {
            let filePath = '',
                imgPrefix = ''

            if(fieldname === 'markdown_img'){
                filePath = path.join(opts.path, mimetype.split('/')[0] + 's/markdown')
                imgPrefix = `${ctx.protocol}://${ctx.host}/${mimetype.split('/')[0]}s/markdown`
            }else{
                filePath = path.join(opts.path, mimetype.split('/')[0] + 's')
                imgPrefix = `${ctx.protocol}://${ctx.host}/${mimetype.split('/')[0]}s` 
            }


            if(!mkdirSync(filePath)){
                throw new Error('没找到目录')
            }

            let fName = rename(filename),
                fPath = path.join(path.join(filePath, fName))
            
            file.pipe(fs.createWriteStream(fPath))
            
            file.on('end', () => {
                fileObj[fieldname] = `${imgPrefix}/${fName}`
            })
        })

        busboy.on('field', (fieldname, val, fieldnameTruncated, valTruncated, encoding, mimetype) => {
            fileObj[fieldname] = val
        })

        busboy.on('finish', async () => {
            resolve(fileObj)
            console.log('finished....')
        })

        busboy.on('error' , (err) => {
            console.log('err:' + err)
            reject(err)
        })

        ctx.req.pipe(busboy)
    }) 
}