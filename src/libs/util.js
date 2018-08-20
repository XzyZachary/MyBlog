let util = {
    cookies: {},
    log:{}
}


util.title = function (titleText){
    window.document.title = `${process.env.VUE_APP_TITLE}${titleText ? ` | ${titleText}` : ''}`
}

export default util