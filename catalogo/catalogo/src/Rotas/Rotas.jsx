import { Routes, Route } from 'react-router-dom'; // Importa componentes de roteamento
import { Inicial } from '../paginas/Inicial'; 
import { ListaSerie } from '../componentes/ListaSerie'; 
import { Lista } from '../componentes/Lista'; 
import { InfosPerfil } from '../componentes/InfosPerfil'; 

export function Rotas() {
    return (
        <Routes>
            {/* Rota principal que usa o 'Inicial' */}
            <Route path='/' element={<Inicial />}>
                
                {/* Rota padrão (index) que será exibida no <Outlet /> */}
                <Route index element={<Lista />} />
                
                {/* Rota /perfil - mostra o componente de informações do perfil */}
                <Route path='perfil' element={<InfosPerfil />} />
                
                {/* Rota /series - mostra o componente com lista de séries */}
                <Route path='series' element={<ListaSerie />} />
            </Route>
        </Routes>
    );
}
