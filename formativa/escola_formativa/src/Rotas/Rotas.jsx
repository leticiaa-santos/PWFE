import { Routes, Route } from 'react-router-dom';
import { Login } from '../Paginas/Login';
import { Inicial } from '../Paginas/Inicial';
import { Menu } from '../Componentes/Menu';
import { DisciplinasProfessor } from '../Paginas/DisciplinasProfessor';
import { Disciplina } from '../Paginas/Disciplina';
import { DisciplinaCadastrar } from '../Paginas/DisciplinaCadastrar';
import { DisciplinaEditar } from '../Paginas/DisciplinaEditar';
import { AmbientesProfessor } from '../Paginas/AmbientesProfessor';
import { Ambientes } from '../Paginas/Ambientes';
import { AmbienteCadastrar } from '../Paginas/AmbienteCadastrar';
import { AmbienteEditar } from '../Paginas/AmbienteEditar';

export function Rotas(){
    return(
        <Routes>
            
            <Route path='/' element={<Login />} />

            <Route path='/inicial' element={<Inicial />}>

                <Route index element={<Menu />} />
                <Route path = 'discprofessor' element = {<DisciplinasProfessor />} />
                <Route path = 'disciplina' element = {<Disciplina />} />
                <Route path = 'discadastrar' element = {<DisciplinaCadastrar />} />
                <Route path = 'editar/:id' element = {<DisciplinaEditar />} />
                <Route path = 'ambiprofessor' element = {<AmbientesProfessor />} />
                <Route path = 'ambiente' element = {<Ambientes />} />
                <Route path = 'ambicadastrar' element = {<AmbienteCadastrar />} />
                <Route path = 'ambieditar/:id' element = {<AmbienteEditar />} />

            </Route>

        </Routes>
    )
}