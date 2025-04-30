import React from "react"
import { BrowserRouter } from "react-router-dom"
import { Rotas } from "./Rotas/Rotas"

//estrutura básica para usar o react é através das funções
function App() {

  //para trazer o resultado da função eu coloco o que eu quero no Return que deve ter apenas 1 componente
  return (
    //para chamar o css dei um apelido de estilos e chamei usando o className
    //Tags fantasmas servem para que eu consiga usar duas tags no mesmo componente
    
    //BrowserRouter permite o uso de rotas com react-router-dom
    //Rotas é o componente que gerencia todas as páginas da aplicação
    <BrowserRouter>
      <Rotas />
    </BrowserRouter>

  );
}

export default App
