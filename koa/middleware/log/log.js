import log4js from 'log4js'
import access from './access'
import config from '../../config'

const methods = ['trace', 'debug', 'info', 'warn', 'error', 'fatal', 'mark']

const baseInfo = config.log

//默认参数
export default (option = {}) => {
    let contextLogger = {}, //错误日志对象，赋值给ctx
        appenders = {},
        opts = Object.assign({}, baseInfo, options),
        {
            logLevel,
            dir,
            ip,
            projectN
        } = opts,
        commonInfo = {
            projectName,
            ip
        };

    appenders.all = {
        type: 'dateFile', //文件类型
        filename: `${dir}/all/`,
        pattern: 'tesk-yyyy-MM-dd.log', //占位符
        alwaysIncludePattern: true //是否有后缀
    }

    if (config.env === 'dev' || config.env === 'local' || config.env === 'development') {
        appenders.out = {
            type: 'console'
        }
    }

    let logConfig = {
        appenders,

        categories: {
            default: {
                appenders: Object.keys(appenders),
                level: logLevel
            }
        }
    }

    let logger = log4js.getLogger('cheese');
    return async (ctx, netx) => {
        const start = Date.now()

        //循环methods将所有方法挂在到ctx上
        methods.forEach((method, i) => {
            contextLogger[method] = message => {
                logConfig.appenders.cheese = {
                    type: 'dateFile',
                    filename: `${dir}/${method}/`,
                    pattern: `${method}-yyyy-MM-dd.log`,
                    alwaysIncludePattern: true
                }
                log4js.configure(logConfig)
                logger[method](access(ctx, message, commonInfo))
            }
        })

        ctx.log = contexLogger

        await next()

        const responseTime = Date.now() - start

        ctx.log.info(access(ctx, {
            responseTime: `ResponeTime${responseTime/1000}s`
        }, commonInfo))
    }

})