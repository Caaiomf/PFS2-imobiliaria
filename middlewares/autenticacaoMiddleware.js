import jwt from "jsonwebtoken";
import UsuarioRepository from "../repositories/usuarioRepository.js";

const SEGREDO = 'RUBYONRAILS'
export default  class AutenticacaoMiddleware{

    gerarJWT(id, nome, email, perfilId){
        let token = jwt.sign({id, nome, email, perfilId}, SEGREDO);
        return token
;    }

    async validar(req, res, next){
        let token = req.cookies['token-pfs2'];
        //Token Precisa existir nas cookies da requisição!
        if(token){
            let payload = jwt.verify(token, SEGREDO);
            let idUsuario = payload.id;
            let repo = new UsuarioRepository;
            if(await repo.obterPorId(idUsuario)){
                next();
            }else{
                return res.status(404).json({msg: "Usuario não encontrado!"})
            }

        }else{
            return res.status(401).json({msg: "Token Inexistente!"});
        }

        console.log(req);
        
    }
}