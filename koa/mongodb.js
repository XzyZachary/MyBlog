import mongoose from 'mongoose'
import conf from './config'


const DB_URL = `mongodb://${conf.mongodb.address}/${conf.mongodb.db}`

mongoose.Promise = global.Promise
mongoose.connect(DB_URL, { useMongoClient: true }, err => {
    if (err){
        console.log("数据库连接失败")
    }
})

export default mongoose