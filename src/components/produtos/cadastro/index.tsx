import {Layout} from "../../layout";
import React, {useEffect, useState} from "react";
import {Input} from "../../common/input";
import {useProdutoService} from "../../../app/services/produto.service";
import {Produto} from "../../../app/models/produtos";
import {converterEmBigDecimal} from 'app/util/money'
import {Alert} from "../../message";
import * as yup from 'yup';
import Link from "next/link";
import {useRouter} from "next/router";

import {formatReal} from '../../../app/util/money/index'


const msgCampoObrigatorio = "Campo Obrigatorio"

const validationSchema = yup.object().shape({
    sku: yup.string().trim().required(msgCampoObrigatorio),
    nome: yup.string().trim().required(msgCampoObrigatorio),
    descricao: yup.string().trim()
        .required(msgCampoObrigatorio),
    preco: yup.number().required(msgCampoObrigatorio).moreThan(0, "Valor deve ser maior que 0,00 (Zero)")
})

interface FormErros {
    sku?: string;
    nome?: string;
    preco?: string;
    descricao?: string;
}


export const CadastroProdutos: React.FC = () => {

    const service = useProdutoService()

    const [sku, setSku] = useState<string>('')
    const [preco, setPreco] = useState<string>('')
    const [nome, setNome] = useState<string>('')
    const [descricao, setDescricao] = useState<string>('')

    const [id, setId] = useState<string>()
    const [dataCadastro, setDataCadastro] = useState<string>()
    const [messages, setMessages] = useState<Array<Alert>>([])
    const [errors, setErrors] = useState<FormErros>({})


    //na mesma tela cadastro produto carregar de acordo com o produto selecionado na tela de listagem produtos
    const router = useRouter();
    const {id: queryId} = router.query;
    useEffect(()=> {
        if (queryId) {
            service.carregarProduto(queryId).then(produtoEncontrado => {
                setId(produtoEncontrado.id)
                setSku(produtoEncontrado.sku)
                setNome(produtoEncontrado.nome)
                setDescricao(produtoEncontrado.descricao)
                setPreco(formatReal(`${produtoEncontrado.preco}`))
                setDataCadastro(produtoEncontrado.cadastro || '')
            })
        }
    }, [queryId])




    const submit = () => {
        const produto: Produto = {
            id,
            sku,
            preco: converterEmBigDecimal(preco),
            nome,
            descricao
        }

        validationSchema.validate(produto).then(obj => {
            setErrors({})

            if (id) {
                service
                    .atualizar(produto)
                    .then(response => {
                        setMessages([{
                            tipo: "success", texto: "atualizado com sucesso!"
                        }])
                    })
            } else {
                service
                    .salvar(produto)
                    .then(produtoResposta => {
                        setId(produtoResposta.id)
                        setDataCadastro(produtoResposta.dataCadastro)
                        setMessages([{
                            tipo: "success", texto: "salvo com sucesso!"
                        }])
                    })
            }
        }).catch(err => {
            const field = err.path;
            const message = err.message;

            setErrors({
                [field]: message
            })
        })
    }


    return (
        <Layout titulo="Produtos" mensagens={messages}>
            {id &&
                <div className="columns">
                    <Input label="Codigo:"
                           id="inputId"
                           columnClasses="is-half"
                           value={id}
                           disabled={true}
                    />
                    <Input label="Data Cadastro"
                           id="inputDataCadastro"
                           type="text"
                           columnClasses="is-half"
                           value={dataCadastro}
                           disabled={true}
                    />
                </div>
            }

            <div className="columns">
                <Input label="SKU *"
                       id="inputSKU"
                       columnClasses="is-half"
                       value={sku}
                       onChange={setSku}
                       placeholder="Digite o SKU do produto"
                       error={errors.sku}
                />
                <Input label="Preço *"
                       id="inputPreco"
                       columnClasses="is-half"
                       value={preco}
                       onChange={setPreco}
                       currency={true}
                       placeholder="Digite o preço do produto"
                       error={errors.preco}
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
                       error={errors.nome}
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
                        {errors.descricao &&
                            <p className="help is-danger">{errors.descricao}</p>
                        }
                    </div>
                </div>
            </div>

            <div className="field is-grouped">
                <div className="control">
                    <button className="button is-link" onClick={submit}>
                        {id ? "Atualizar" : "Salvar"}
                    </button>
                </div>
                <div className="control">
                    <Link href="/consultas/produtos">
                        <button className="button is-link is-light">Voltar</button>
                    </Link>
                </div>
            </div>
        </Layout>
    )
}
