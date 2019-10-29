export default {
    get(value){
        let data = JSON.parse(window.localStorage.getItem(value))
        return data;
    },
    set(key,value){
        window.localStorage.setItem(key,JSON.stringify(value))
    },
    remove(key){
        window.localStorage.removeItem(key)
    },
    clear(){
        window.localStorage.clear()
    }
}