

export default class LocacaoController{
    constructor(){

    }

    async loca(req,res){
        try{

        }catch(ex){
            console.log(ex);
            return res.status(500).json({msg: "Erro iterno no servidor!"})
        }
    }
}