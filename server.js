import express from 'express';

const server = express();

server.listen(5000, function(){
    console.log("Servidor web em funcionamento porta")
})