import next from 'next';import http from 'node:http';
const port=Number(process.env.PORT||3000);const app=next({dev:false});await app.prepare();const handle=app.getRequestHandler();http.createServer((req,res)=>handle(req,res)).listen(port,'0.0.0.0',()=>console.log('KOBSHI application started on port '+port));
