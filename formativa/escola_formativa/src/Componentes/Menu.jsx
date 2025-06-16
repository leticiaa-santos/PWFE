import estilo from './Menu.module.css';
import ambiente from '../assets/ambiente.png';
import disciplina from '../assets/disciplina.png';
import professor from '../assets/professor.png';
import gestor from '../assets/gestor.png'
import sala from '../assets/sala.png';
import { Link } from 'react-router-dom';


export function Menu(){

    const tipo = localStorage.getItem('tipo');
    const linkDisciplina = tipo === 'P' ? 'discprofessor' : 'disciplina'
    const linkAmbiente = tipo === 'P' ? 'ambiprofessor' : 'ambiente'

    return(
        <div className={estilo.container}>
            <table className={estilo.menu}>
                <tbody>
                    <tr>
                        <td>
                            <Link to = {linkDisciplina}>
                                <img src={ disciplina }/>
                                <label alt='Disciplinas'>Disciplinas</label>
                            </Link>
                        </td>
                        <td>
                            <Link to = {linkAmbiente}>
                                <img src={ ambiente }/>
                                <label alt='Ambientes reservados'>Ambiente</label>
                            </Link>
                        </td>
                    </tr>
                    <tr>
                        {/* Só exibe o botão de Salas se for gestor */}
                        {tipo === 'G' && (
                            <>
                                <td>
                                    <Link to = "professor">
                                        <img src={ professor }/>
                                        <label alt='Professores'>Professores</label>
                                    </Link>
                                </td>
                            
                        
                                <td>
                                    <Link to="gestor">
                                        <img src={ gestor }/>
                                        <label alt='Gestores'>Gestores</label>
                                    </Link>
                                </td>
                            
                    
                                <td>
                                    <Link to="sala">
                                        <img src={ sala }/>
                                        <label alt='Salas'>Salas</label>
                                    </Link>
                                </td>
                            </>
                        )}
                    </tr>
                </tbody>
            </table>
        </div>
    )
}