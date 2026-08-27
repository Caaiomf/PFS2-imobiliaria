import swaggerAutogen from "swagger-autogen";

const doc = {
    info: {
        title: "API para a disciplina de PFS2",
        description: "documentação do conjunto de endpoints criados durante a aula de programação fullstack 2"
    },
    host: "localhost:5000"
}

const outputFile ="./swagger-output.json";
const routes = ["./server.js"];

swaggerAutogen()(outputFile,routes,doc);