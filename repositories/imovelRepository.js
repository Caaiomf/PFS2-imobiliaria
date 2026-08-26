import Database from "../database/database";

export default class ImovelRepository{

    #banco;

    constructor() {
        this.#banco = new Database();
    }
    async cadastrar(entidade){
        //INSERT
        let sql = "insert into tb_imovel (imv_descricao, imv_cep, imv_endereco, imv_bairro, imv_cidade, imv_valor, imv_disponivel) values (?,?,?,?,?,?,?)";
        let valores = [entidade.descricao, entidade.cep, entidade.endereco, entidade.bairro, entidade.cidade, entidade.valor, entidade.disponivel];

        let idGerado = await this.#banco.ExecutarComandoLastInsert(sql, valores);
        if(idGerado){
            entidade.id = idGerado;
            return true
        }
        return false;
    }

    listar(){
        //SELECT
    }

    atualizar(entidade){
        //UPDATE
    }

    deletar(id) {
        //DELET
    }
}