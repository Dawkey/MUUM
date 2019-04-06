//防抖
export function debounce(fn,interval){
    let timer = null;
    return function(...args){
        clearTimeout(timer);
        timer = setTimeout(()=>{
            fn.apply(this,args); 
        },interval)
    }
}