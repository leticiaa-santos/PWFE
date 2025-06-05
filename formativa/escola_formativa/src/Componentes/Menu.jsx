import estilo from './Menu.module.css';
import ambiente from '../assets/ambiente.png';
import disciplina from '../assets/disciplina.png';
import professor from '../assets/professor.png';
import gestor from '../assets/gestor.png'
import { Link } from 'react-router-dom';
import { DisciplinasProfessor } from '../Paginas/DisciplinasProfessor';

export function Menu(){

    const tipo = localStorage.getItem('tipo');
    const linkDisciplina = tipo === 'P' ? 'discprofessor' : 'disciplina'

    return(
        <div className={estilo.container}>
            <table>
                <tbody>
                    <tr>
                        <td>
                            <Link to = {linkDisciplina}>
                                <img src={ disciplina }/>
                                <label alt='Disciplinas do professor'>Disciplinas</label>
                            </Link>
                        </td>
                        <td>
                            <img src={ ambiente }/>
                            <label alt='Ambientes reservados do professor'>Ambiente</label>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <img src={ professor }/>
                            <label alt='Professores'>Professores</label>
                        </td>
                        <td>
                            <img src={ gestor }/>
                            <label alt='Gestores'>Gestores</label>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}