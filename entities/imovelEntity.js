export default class ImovelEntity{

    #id;
    #descricao;
    #cep;
    #endereco;
    #bairro;
    #cidade;
    #valor;
    #disponivel;

    get id(){
        return this.#id;
    }

    set id(valor){
        this.#id = valor;
    }
        get descricao(){
        return this.#descricao;
    }

    set descricao(valor){
        this.#descricao = valor;
    }
    get cep(){
        return this.#cep;
    }

    set cep(valor){
        this.#cep = valor;
    }
        get endereco(){
        return this.#endereco;
    }

    set endereco(valor){
        this.#endereco = valor;
    }

    get bairro(){
        return this.#bairro;
    }

    set bairro(valor){
        this.#bairro = valor;
    }
    get cidade(){
        return this.#cidade;
    }

    set cidade(valor){
        this.#cidade = valor;
    }
    get valor(){
        return this.#valor;
    }

    set valor(value){
        this.#valor = valor;
    }

    get disponivel(){
        return this.#id;
    }

    set disponivel(valor){
        this.#disponivel = valor;
    }
constructor(id,descricao,cep,endereco,bairro,cidade,valor,disponivel){
    this.#id = id;
    this.#descricao = descricao;
    this.#cep = cep;
    this.#endereco = endereco;
    this.#bairro = bairro;
    this.#cidade = cidade;
    this.#valor = valor;
    this.#disponivel = disponivel;
}
}