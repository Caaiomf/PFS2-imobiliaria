import Database from "../database/database.js";
import ImovelEntity from "../entities/imovelEntity.js";

export default class ImovelRepository{

    #banco;

    constructor() {
        this.#banco = new Database();
    }
        async cadastrar(entidade){
            //INSERT
            let sql = "insert into tb_imovel (imv_descricao, imv_cep, imv_endereco, imv_bairro, imv_cidade, imv_valor, imv_disponivel) values (?,?,?,?,?,?,?)";
            let valores = [entidade.descricao, entidade.cep, entidade.endereco, entidade.bairro, entidade.cidade, entidade.valor, entidade.disponivel];

            let idGerado = await this.#banco.ExecutaComandoLastInserted(sql, valores);
            if(idGerado){
                entidade.id = idGerado;
                return true
            }
            return false;
        }

    async listar(){
        //SELECT
        let sql = "select * from tb_imovel";

        let rows  = await this.#banco.ExecutaComando(sql);
        let lista = [];

    for(let row of rows){
        //mapeamento banco -> entidade
        lista.push(ImovelEntity.toMap(row));
    }
        return lista;
    }

    async atualizar(entidade){
        //UPDATE
        let sql = "update tb_imovel set imv_descricao = ?, imv_cep = ?, imv_endereco = ?, imv_bairro = ?, imv_cidade = ?, imv_valor = ?, imv_disponivel = ? where imv_id = ?";
        let valores = [entidade.descricao, entidade.cep, entidade.endereco, entidade.bairro, entidade.cidade, entidade.valor, entidade.disponivel, entidade.id];

        let result = await this.#banco.ExecutaComandoNonQuery(sql,valores);

        return result;
    }

    async deletar(id) {
        //DELET
        let sql = "delete from tb_imovel where imv_id = ?";

        let valores = [id];

        let result = await this.#banco.ExecutaComandoNonQuery(sql,valores);
        return result;
    }

    async obterPorId(id)
    {
        let sql = "select * from tb_imovel where imv_id = ?";
        let valores = [id];

        let rows = await this.#banco.ExecutaComando(sql, valores);
        if(rows && rows.length > 0){
            return ImovelEntity.toMap(rows[0]);
        }

        return null;
    }
}