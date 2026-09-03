import jwt from "jsonwebtoken";

const SEGREDO = 'RUBYONRAILS'
export default  class AutenticacaoMiddleware{

    gerarJWT(id, nome, email, perfilId){
        let token = jwt.sign({id, nome, email, perfilId}, SEGREDO);
        return token
;    }

    async validar(req, res, next){

    }
}