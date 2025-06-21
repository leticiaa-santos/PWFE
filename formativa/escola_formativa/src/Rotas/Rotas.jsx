import { Routes, Route } from 'react-router-dom';
import { Login } from '../Paginas/Login';
import { Inicial } from '../Paginas/Inicial';
import { DisciplinasProfessor } from '../Paginas/DisciplinasProfessor';
import { Disciplina } from '../Paginas/Disciplina';
import { DisciplinaCadastrar } from '../Paginas/DisciplinaCadastrar';
import { DisciplinaEditar } from '../Paginas/DisciplinaEditar';
import { AmbientesProfessor } from '../Paginas/AmbientesProfessor';
import { Ambientes } from '../Paginas/Ambientes';
import { AmbienteCadastrar } from '../Paginas/AmbienteCadastrar';
import { AmbienteEditar } from '../Paginas/AmbienteEditar';
import { Salas } from '../Paginas/Salas';
import { SalaCadastrar } from '../Paginas/SalaCadastrar';
import { SalaEditar } from '../Paginas/SalaEditar';
import { Professores } from '../Paginas/Professores';
import { ProfessoresCadastrar } from '../Paginas/ProfessoresCadastrar';
import { ProfessoresEditar } from '../Paginas/ProfessoresEditar';
import { Gestores } from '../Paginas/Gestores';
import { GestoresEditar } from '../Paginas/GestoresEditar';
import { GestoresCadastrar } from '../Paginas/GestoresCadastrar';

export function Rotas(){
    return(
        <Routes>
            
            <Route path='/' element={<Login />} />

            <Route path='/inicial' element={<Inicial />}>

                {/* <Route index element={<Menu />} /> */}

                <Route path = 'discprofessor' element = {<DisciplinasProfessor />} />
                <Route path = 'disciplina' element = {<Disciplina />} />
                <Route path = 'discadastrar' element = {<DisciplinaCadastrar />} />
                <Route path = 'disceditar/:id' element = {<DisciplinaEditar />} />

                <Route path = 'ambiprofessor' element = {<AmbientesProfessor />} />
                <Route path = 'ambiente' element = {<Ambientes />} />
                <Route path = 'ambicadastrar' element = {<AmbienteCadastrar />} />
                <Route path = 'ambieditar/:id' element = {<AmbienteEditar />} />

                <Route path = 'sala' element = {<Salas />} />
                <Route path = 'salacadastrar' element = {<SalaCadastrar />} />
                <Route path = 'salaeditar/:id' element = {<SalaEditar />} />

                <Route path = 'professor' element = {<Professores />} />
                <Route path = 'profcadastrar' element = {<ProfessoresCadastrar />} />
                <Route path = 'profeditar/:id' element = {<ProfessoresEditar />} />

                <Route path = 'gestor' element = {<Gestores />} />
                <Route path = 'gestorcadastrar' element = {<GestoresCadastrar />} />
                <Route path = 'gestoreditar/:id' element = {<GestoresEditar />} />
            </Route>

        </Routes>
    )
}