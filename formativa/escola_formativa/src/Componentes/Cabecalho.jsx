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
                <img className={estilo.logo} src={ logo }/>
                <ul>

                    <Link to = {linkDisciplina}>
                        <li>Disciplinas</li>
                    </Link>
                    
                    <Link to = {linkAmbiente}>
                        <li>Reservas</li>
                    </Link>

                    {tipo === 'G' && (
                        <>
                            <Link to = 'professor'>
                                <li>Professores</li>
                            </Link>
                            
                            <Link to = 'gestor'>
                                <li>Gestores</li>
                            </Link>

                            <Link to = 'sala'>
                                <li>Salas</li>
                            </Link>
                            
                        </>
                    )}

                    <li>Olá, {nome}!</li>

                    <li onClick={() => handleLogout()}>  
                        Sair
                        <img src={logout} alt="" />
                    </li>
                    
                </ul>
            </nav>

            <div className={estilo.containerBanner}>
                <img src={banner} alt="" />
            </div>

        </header>
    );
}