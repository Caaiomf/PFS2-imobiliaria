import express from "express";
import ImovelController from "../controllers/imovelController.js";

const router = express.Router();

let controladora = new ImovelController();
router.get("/",(req,res) =>{
    // #swagger.tags = ['Imovel']
    // #swagger.summary = "lista todos imoveis cadastrados"
    controladora.listar(req,res);

})
router.post("/", (req,res) => {
    // #swagger.tags = ['Imovel']
    // #swagger.summary = "Cadastrar imoveis"
    controladora.cadastrar(req,res);
})

export default router;