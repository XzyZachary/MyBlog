export default function timerPluging(time, ...subscribeTypes){
    return store => {
        setInterval(function (){
            subscribeTypes.forEach(type => {
                store.commit(type, new Date().getTime())
            })
        }, time)
    }
}