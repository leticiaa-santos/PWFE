import { Routes, Route } from 'react-router-dom';
import { Login } from '../Paginas/Login';
import { Inicial } from '../Paginas/Inicial';
import { Conteudo } from '../Componentes/Conteudo';
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
import { NotFound } from '../Paginas/NotFound';

export function Rotas(){
    return(
        <Routes>
            
            <Route path='/' element={<Login />} />

            <Route path='/inicial' element={<Inicial />}>

                <Route index element={<Conteudo />} />

                {/* Rotas relacionadas a disciplina */}
                <Route path = 'discprofessor' element = {<DisciplinasProfessor />} />
                <Route path = 'disciplina' element = {<Disciplina />} />
                <Route path = 'discadastrar' element = {<DisciplinaCadastrar />} />
                <Route path = 'disceditar/:id' element = {<DisciplinaEditar />} />

                {/* Rotas relacionadas a ambiente */}
                <Route path = 'ambiprofessor' element = {<AmbientesProfessor />} />
                <Route path = 'ambiente' element = {<Ambientes />} />
                <Route path = 'ambicadastrar' element = {<AmbienteCadastrar />} />
                <Route path = 'ambieditar/:id' element = {<AmbienteEditar />} />

                {/* Rotas relacionadas a sala */}
                <Route path = 'sala' element = {<Salas />} />
                <Route path = 'salacadastrar' element = {<SalaCadastrar />} />
                <Route path = 'salaeditar/:id' element = {<SalaEditar />} />

                {/* Rotas relacionadas a professor */}
                <Route path = 'professor' element = {<Professores />} />
                <Route path = 'profcadastrar' element = {<ProfessoresCadastrar />} />
                <Route path = 'profeditar/:id' element = {<ProfessoresEditar />} />

                {/* Rotas relacionadas a gestor */}
                <Route path = 'gestor' element = {<Gestores />} />
                <Route path = 'gestorcadastrar' element = {<GestoresCadastrar />} />
                <Route path = 'gestoreditar/:id' element = {<GestoresEditar />} />

                {/* Rota para uma página que não existe dentro de /inicial */}
                <Route path="*" element={<NotFound />} />
                
            </Route>
            
            {/* Rota para uma página que não existe fora de /inicial */}
            <Route path="*" element={<NotFound />} />

        </Routes>
    )
}