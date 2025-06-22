import estilo from './Cabecalho.module.css';
import logo from '../assets/logo.svg';
import logout from '../assets/logout.png';
import banner from '../assets/banner.png'
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

export function Cabecalho(){

    const navigate = useNavigate();
    const tipo = localStorage.getItem('tipo');
    const linkDisciplina = tipo === 'P' ? 'discprofessor' : 'disciplina'
    const linkAmbiente = tipo === 'P' ? 'ambiprofessor' : 'ambiente'
    const nome = localStorage.getItem('username')

    function handleLogout(){
        localStorage.clear();
        navigate('/');
    }

    return(
        <header>
            
            <nav className={estilo.container}>
                <Link to = '/inicial'>
                    <img className={estilo.logo} src={ logo }/>
                </Link>
                <ul>

                    <Link to = {linkDisciplina} className={estilo.linkMenu}>
                        <li>Disciplinas</li>
                    </Link>
                    
                    <Link to = {linkAmbiente} className={estilo.linkMenu}>
                        <li>Reservas</li>
                    </Link>

                    {tipo === 'G' && (
                        <>
                            <Link to = 'professor' className={estilo.linkMenu}>
                                <li>Professores</li>
                            </Link>
                            
                            <Link to = 'gestor' className={estilo.linkMenu}>
                                <li>Gestores</li>
                            </Link>

                            <Link to = 'sala' className={estilo.linkMenu}>
                                <li>Salas</li>
                            </Link>
                            
                        </>
                    )}

                    <li className={estilo.usuarioNome}>Olá, {nome}!</li>

                    <li onClick={() => handleLogout()} className={estilo.linkLogout}>  
                        Sair
                        <img src={logout} alt="" />
                    </li>
                    
                </ul>
            </nav>

        </header>
    );
}