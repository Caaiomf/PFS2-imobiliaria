import AluguelEntity from "../entities/aluguelEntity.js";
import ContratoEntity from "../entities/contratoEntity.js";
import AluguelRepository from "../repositories/aluguelRepository.js";
import ContratoRepository from "../repositories/contratoRepository.js";
import ImovelRepository from "../repositories/imovelRepository.js"


export default class LocacaoController{

    #contratoRepo;
    #aluguelRepo;
    #imovelRepo;

    constructor(){
        this.#aluguelRepo = new AluguelRepository();
        this.#contratoRepo = new ContratoRepository();
        this.#imovelRepo = new ImovelRepository();

    }

    async loca(req,res){
        try{
            let{idImovel} = req.body;

            //validar o imovel
            let imovel = await this.#imovelRepo.obterPorId(idImovel);
            if(imovel == null || imovel.disponivel == 'N'){
                return res.status(400).json({msg: "Este imovel não esta disponivel para locação!"})
            }
            //gerar contrato
            let contrato = new ContratoEntity();
            contrato.imovel = imovel;
            contrato.usuario = req.usuario;
            if(await this.#contratoRepo.gravar(contrato)) {
                //Contrato gerado
                //Inserir Alugueis
                //como regra de negocio nosso sistema considera todos os contratos com ducacao de 1 ano (12 messes)

                let aluguel = new AluguelEntity();
                let dataHoje = new Date();
                aluguel.contrato = contrato;
                aluguel.valor = imovel.valor;
                aluguel.pago = "N";
                for (let i = 0; i < 12; i++){
                    //comecamos o mes com o mes seguinte ao mes atual
                    let dataVencimento = dataHoje.getDate.setMonth(dataHoje.getMonth() + i);
                    aluguel.mes = dataHoje.getMonth() + 1;
                    aluguel.vencimento = dataVencimento;

                    await this.#aluguelRepo.gravar(aluguel);
                }

                // marca o imovel como indiponivel
                imovel.disponivel = "N";
                if(await this.#imovelRepo.atualizar(imovel)){
                    //finalizar transação com commit
                    return res.status(200).json({msg: "Imovel alugado com sucesso!"})
                }else{
                    throw new Error("Erro ao atualizar imovel no banco de dados");
                }
            }
            else 
                throw new Error("Erro ao inserior contrato no banco de dados!");

        }catch(ex){
            //encerra a transacao com ROLLBACK
            console.log(ex);
            return res.status(500).json({msg: "Erro iterno no servidor!"})
        }
    }
}