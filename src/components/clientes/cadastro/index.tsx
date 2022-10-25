import {Layout} from "../../layout";
import {ClienteForm} from "./form";
import {useState} from "react";
import {Cliente} from "../../../app/models/clientes";

export const CadastroClientes = () => {

    const [cliente, setCliente] = useState<Cliente>({});

    const handleSubmit = (cliente: Cliente) => {
        console.log(cliente)
    }

  return(
      <Layout titulo="Cadastro de Clientes">
          <ClienteForm cliente={cliente} onSubmit={handleSubmit}/>
      </Layout>
  )
}
