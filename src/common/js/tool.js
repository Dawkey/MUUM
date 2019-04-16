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


//节流
export function throttle(fn,interval){

    let flag = true;
  
    return function(...args){
        if(!flag) return;
    
        flag = false;
        setTimeout(()=>{
            fn.apply(this,args);
            flag = true;
        },interval);
    }
  
}