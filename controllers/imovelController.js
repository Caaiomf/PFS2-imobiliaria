import ImovelEntity from "../entities/imovelEntity.js";
import ImovelRepository from "../repositories/imovelRepository.js";

export default class ImovelController{
    #repo;

    constructor(){
        this.#repo = new ImovelRepository();
    }
    async listar (req,res){
        try{
            let lista = await this.#repo.listar();
            if(lista.length == 0){
                return res.status(204).json({msg: "Nenhum imovel Encontrado!"});
            }
            return res.status(200).json(lista);
        }catch(ex){
            console.log(ex);
            return res.status(500).json({msg: "Erro interno no servidor"})
        }
    }
    async cadastrar(req,res){
        try{
            let{descricao, cep, endereco, bairro, cidade, valor, disponivel} = req.body;
            let entidade = new ImovelEntity(0, descricao, cep, endereco, bairro, cidade, valor, disponivel);
            if(entidade.validar()){
                let result = await this.#repo.cadastrar(entidade);
                if(result){
                    return res.status(201).json(entidade);
                }

                throw new Error("Erro ao inserir Imovel no banco de dados");
            }
        }catch(ex){
            console.log(ex);
            return res.status(500).json({msg: "Erro interno no servidor"})
        }
    }
    async atualizar(req,res){
        try{

        }catch(ex){
            console.log(ex);
            return res.status(500).json({msg: "Erro interno no servidor"})
        }
    }
    async deletar(req,res){
        try{

        }catch(ex){
            console.log(ex);
            return res.status(500).json({msg: "Erro interno no servidor"})
        }
    }
}