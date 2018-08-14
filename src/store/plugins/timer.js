export default function timerPluging(time, ...subscribeTypes){
    return store => {
        setInterval(function (){
            subscirbeTypes.forEach(type => {
                store.commit(type, new Date().getTime())
            })
        }, time)
    }
}