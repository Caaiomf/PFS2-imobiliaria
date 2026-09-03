import express from 'express';
import imovelRouter from './routes/imovelRouter.js';
import loginRouter from './routes/loginRouter.js';
import swaggerUI from "swagger-ui-express";
import{createRequire} from "module";
const require = createRequire(import.meta.url);
const outputJson = require("./swagger-output.json");

const server = express();

server.use(express.json());

server.use("/docs", swaggerUI.serve, swaggerUI.setup(outputJson));

server.use("/imovel", imovelRouter);
server.use("/login", loginRouter);

server.listen(5000, function(){
    console.log("Servidor web em funcionamento")
})