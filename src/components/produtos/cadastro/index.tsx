import {Layout} from "../../layout";
import React, {useState} from "react";
import {Input} from "../../common/input";
import {useProdutoService} from "../../../app/services/produto.service";
import {Produto} from "../../../app/models/produtos";

export const CadastroProdutos: React.FC = () => {

    const service = useProdutoService()

    const [sku, setSku] = useState('')
    const [preco, setPreco] = useState('')
    const [nome, setNome] = useState('')
    const [descricao, setDescricao] = useState('')


    const submit = () => {
      const produto: Produto = {
          sku,
          preco: parseFloat(preco),
          nome,
          descricao
      }
      service
          .salvar(produto)
          .then(produtoResposta => console.log(produtoResposta))
    }


    return (
        <Layout titulo="Cadastro de Produtos">
            <div className="columns">
                <Input label="SKU *"
                       id="inputSKU"
                       columnClasses="is-half"
                       value={sku}
                       onChange={setSku}
                       placeholder="Digite o SKU do produto"
                />
                <Input label="Preço *"
                       id="inputPreco"
                       type="number"
                       columnClasses="is-half"
                       value={preco}
                       onChange={setPreco}
                       placeholder="Digite o preço do produto"
                />
            </div>

            <div className="columns">
                <Input label="Nome *"
                       id="inputNome"
                       type="text"
                       columnClasses="is-full"
                       value={nome}
                       onChange={setNome}
                       placeholder="Digite o nome do produto"
                />
            </div>

            <div className="columns">
                <div className="field column is-full">
                    <label className="label" htmlFor="inputDesc">Descrição: *</label>
                    <div className="control">
                    <textarea className="textarea"
                              id="inputDesc"
                              value={descricao}
                              onChange={event => setDescricao(event.target.value)}
                              placeholder="Digite descrição do produto"/>
                    </div>
                </div>
            </div>

            <div className="field is-grouped">
                <div className="control">
                    <button className="button is-link" onClick={submit}>Salvar</button>
                </div>
                <div className="control">
                    <button className="button is-link is-light">Voltar</button>
                </div>
            </div>
        </Layout>
    )
}
