export default (ctx, msg, commonInfo) => {
    const {
        method,
        url,
        host,
        headers
    } = ctx.request;

    const client = {
        method,
        url,
        host,
        msg,
        ip: ctx.get_client_ip(ctx),
        referer: headers['referer'],
        userAgent: headers['user-agent']
    }

    return JSON.stringify(Object.assign(commonInfo, client));
}