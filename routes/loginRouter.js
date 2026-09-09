import express from "express";
import loginController from "../controllers/loginController.js";

const router = express.Router();
let controladora = new loginController();
router.post("/",  (req,res) => {

    // #swagger.tags = ["login"]
    // #swagger.summary = "gera a autenticação via JWT na cookie do navegador"
    controladora.validar(req,res);
})

export default router