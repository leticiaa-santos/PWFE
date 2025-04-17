import {Routes, Route} from 'react-router-dom';
import { Inicial } from '../paginas/Inicial';
import { Perfil } from '../paginas/Perfil';
import { Series } from '../paginas/Series';
import { Lista } from '../componentes/Lista';

export function Rotas(){
    return(
        <Routes>

            <Route path = '/' element = {<Inicial/>}>
                <Route index element = {<Lista/>}/>
                <Route path = 'perfil' element = {<Perfil/>}/>
                <Route path = 'series' element = {<Series/>}/> 
            </Route>

        </Routes>        
    );
}