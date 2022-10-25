import {Cliente} from "../../../app/models/clientes";
import React from "react";
import {useFormik} from "formik";
import {Input} from "../../common/input";


interface ClienteFormProps {
    cliente: Cliente;
    onSubmit: (cliente: Cliente) => void;
}

const formScheme: Cliente = {
    dataCadastro: '',
    cpf: '',
    nascimento: '',
    email: '',
    endereco: '',
    id: '',
    nome: '',
    telefone: ''
}


export const ClienteForm: React.FC <ClienteFormProps> = ({cliente, onSubmit}) => {

    const formik = useFormik<Cliente>({
        initialValues: {...formScheme, ...cliente},
        onSubmit,
    })

  return(
      <form onSubmit={formik.handleSubmit}>
          {formik.values.id &&
              <div className="columns">
                  <Input label="codigo:"
                         id="id"
                         autoComplete="off"
                         columnClasses="is-half"
                         disabled={true}
                         value={formik.values.id}/>
                  <Input label="dataCadastro:"
                         id="dataCadastro"
                         autoComplete="off"
                         columnClasses="is-half"
                         disabled={true}
                         value={formik.values.dataCadastro}/>
              </div>
          }

        <div className="columns">
            <Input label="Nome:"
                   id="nome"
                   autoComplete="off"
                   columnClasses="is-full"
                   onChange={formik.handleChange}
                   value={formik.values.nome}/>
        </div>
          <div className="columns">
              <Input label="CPF:"
                     id="cpf"
                     autoComplete="off"
                     columnClasses="is-half"
                     onChange={formik.handleChange}
                     value={formik.values.cpf}/>
              <Input label="Nascimento:"
                     id="nascimento"
                     autoComplete="off"
                     columnClasses="is-half"
                     onChange={formik.handleChange}
                     value={formik.values.nascimento}/>
          </div>
          <div className="columns">
              <Input label="Endereco:"
                     id="endereco"
                     autoComplete="off"
                     columnClasses="is-full"
                     onChange={formik.handleChange}
                     value={formik.values.endereco}/>
          </div>
          <div className="columns">
              <Input label="email:"
                     id="email"
                     autoComplete="off"
                     columnClasses="is-half"
                     onChange={formik.handleChange}
                     value={formik.values.email}/>
              <Input label="telefone:"
                     id="telefone"
                     autoComplete="off"
                     columnClasses="is-half"
                     onChange={formik.handleChange}
                     value={formik.values.telefone}/>
          </div>
          <div className="field is-grouped">
              <div className="control is-link">
                <button type="submit" className="button">
                    {formik.values.id ? "Atualizar" : "Salvar"}
                </button>
              </div>
          </div>
      </form>
  )
}
