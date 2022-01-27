// const os = require('os');
const http = require("http")
// const cpus = os.cpus() //获取当前系统的cpu数量
// console.log(cpus.length);
// //获取内存信息
// const total = os.totalmem()//总内存
// const free = os.freemem();//剩余内存
// console.log(`${(free/1024/1024/1024).toFixed(2)}GB/${(total/1024/1024/1024).toFixed(2)}GB`)


//web服务
const server = http.createServer((req,res)=>{
    res.end("success")
})
server.listen(3000,"127.0.0.1",()=>{
    console.log("success")
})
