/**
 * Created by zhoux on 2019/3/30.
 */
const http = require('http');
const fs = require('fs');//文件系统
let server = http.createServer((req,res)=>{
        //request  请求  接到的数据  输入
        //respond  响应  发送出去的数据  输出
     //req.url  自带斜杠
        fs.readFile(`www${req.url}`,(err,data)=>{
        if(err){
            res.write('404');
        }else{
            res.write(data);
        }
res.end();

    });
//程序员内功  算法和设计模式  架构
//web  性能
//无关系的进程之间的通信  管道  共享缓存  socket
//fs.readFile  异步操作************
// *
//单线程和非阻塞IO
//数据交互
//node  接收get  post  文件数据
//2、数据库  websocket


});
//监听
server.listen(8080);
//node.js和jsvsscript差不多
//模块
//http  模块
//http.createServer(()=>{
//有浏览器请求 执行回调函数
// })
//server.listen(8080)  端口号
//为什么用node.js
//1、安全性
//2、性能
//3、前台交互数据