export function deepClone(target: any){
    if(typeof target === "object"){
        const result: any = Array.isArray(target) ? [] : {};
        for(const key in target){
            if(typeof target[key] === "object"){
                result[key] === deepClone(target[key])
            }else{
                result[key] = target[key]
            }
        }
        return result
    }
    return target
}

export function generateUniqueId(){
    return "id-" + Date.now() + "-" + Math.random().toString(36).substring(2,9)
}