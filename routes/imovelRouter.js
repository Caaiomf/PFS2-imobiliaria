import express from "express";
import ImovelController from "../controllers/imovelController.js";
import AutenticacaoMiddleware from "../middlewares/autenticacaoMiddleware.js";

const router = express.Router();

let controladora = new ImovelController();
let auth = new AutenticacaoMiddleware();
router.get("/", auth.validar,(req,res) =>{
    // #swagger.tags = ['Imovel']
    // #swagger.summary = "lista todos imoveis cadastrados"
    controladora.listar(req,res);

})
router.post("/", auth.validar, (req,res) => {
    // #swagger.tags = ['Imovel']
    // #swagger.summary = "Cadastrar imoveis"
    controladora.cadastrar(req,res);
})

router.put("/", auth.validar, (req,res) =>{
    // #swagger.tags = ['Imovel']
    // #swagger.summary = "Atualizar um imovel existente"
    controladora.atualizar(req,res);
})

router.delete("/:id", auth.validar, (req,res) => {
    // #swagger.tags = ['Imovel']
    // #swagger.summary = "excluir um imovel existente"
    controladora.deletar(req,res);
})

export default router;