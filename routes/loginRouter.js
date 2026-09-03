import express from "express";
import loginController from "../controllers/loginController";

const router = express.Router();
let controladora = new loginController();
router.post("/",  (req,res) => {
    controladora.validar(req,res);
})

export default router