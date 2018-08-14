import Koa from 'koa'
import ip from 'ip'
import conf from './config'
import router from './router'
import middleware from './middleware'
import cors from 'koa2-cors'
import './mongodb'

const app = new Koa()
app.use(cors({
    origin: 'http://localhost:8080',
    exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
    maxAge: 5,
    credentials: true,
    allowMethods: ['GET', 'POST', 'DELETE'],
    allowHeaders: ['Content-Type', 'Authorization', 'Accept'],
  }))
middleware(app)
router(app)


app.listen(conf.port, '0.0.0.0', () => {
    console.log(`server is running at ${ip.address()}:${conf.port}`)
})