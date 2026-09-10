import AutenticacaoMiddleware from "../middlewares/autenticacaoMiddleware.js";
import UsuarioRepository from "../repositories/usuarioRepository.js";

export default class loginController{

    #repoUsuario;

    constructor(){
        this.#repoUsuario = new UsuarioRepository();

    }

    async validar(req,res){
        try{
            let {email, senha} = req.body;
            if(email && senha){
                let usuario = await this.#repoUsuario.obterPorEmailSenha(email, senha);
                if(usuario){
                    //contrei o usuario!
                    //vamos gerar a auth
                    let middleware = new AutenticacaoMiddleware();
                    let token = middleware.gerarJWT(usuario.id, usuario.nome,usuario.email,usuario.perfil.id);
                    res.cookie("token-pfs2", token, {httpOnly: true});
                    return res.status(200).json({token: token});
                }
                else{
                    return res.status(404).json({msg: "Usuario Nao Encontrado;"});
                }
            }
            else{
                return res.status(400).json({msg: "Email e senha incorreto"})
            }
        }
        catch(ex){
            console.log(ex);
            return res.status(500).json({msg: "Erro interno no servidor"})
        }

    }
}