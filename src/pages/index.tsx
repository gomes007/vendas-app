import Head from 'next/head'
import React from "react";
import {Layout} from "../components";

const Home: React.FC = () => {
  return (
    <div>
      <Head>
        <title>Vendas App</title>
        <link rel="icon" href="/Users/Paulo/Desktop/Spring/vendas-app/public/favicon.ico" />
      </Head>

        <Layout/>

    </div>
  )
}

export default Home
