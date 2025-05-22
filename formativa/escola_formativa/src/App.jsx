import { BrowserRouter } from "react-router-dom";
import { Inicial } from "./Paginas/Inicial";
import { Rotas } from './Rotas/Rotas';

function App() {

  return (
    <BrowserRouter>
      <Rotas />
    </BrowserRouter>
  )
}

export default App
