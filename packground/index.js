window.onerror = (message, source, lineno, colno, error)=>{
    console.log("捕获到的错误信息：", message, source, lineno, colno, error);
}

// 示例1：常规运行错误，可以捕获
setTimeout(()=>{
    console.log(notdefined)
},0)
