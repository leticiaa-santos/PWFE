import estilos from './App.module.css';
import { BarraNavegacao } from './componentes/barraNavegacao/BarraNavegacao';
import { Cabecalho } from './componentes/cabecalho/Cabecalho';
import { Conteudo } from './componentes/conteudo/Conteudo';
import { Rodape } from './componentes/rodape/Rodape';

//estrutura básica para usar o react é através das funções
function App() {

  //para trazer o resultado da função eu coloco o que eu quero no Return que deve ter apenas 1 componente
  return (
    //para chamar o css dei um aplido de estilos e chamei usando o className
    //Tags fantasmas servem para que eu consiga usar duas tags no mesmo componente
    
    <>
      <Cabecalho/>
      <BarraNavegacao/>
      <Conteudo/>
      <Rodape/>
    </>
    

  )
}

export default App
