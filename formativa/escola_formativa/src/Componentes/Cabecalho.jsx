import estilo from './Cabecalho.module.css';
import logo from '../assets/logo.svg'

export function Cabecalho(){
    return(
        <header className={estilo.container}>
            <img className={estilo.logo} src={ logo }/>
            <nav className={estilo.container}>
                <ul>
                    <li>História</li>
                    <li>Sobre Nós</li>
                    <li>Missão</li>
                    <li>Visão</li>
                    <li>Valores</li>
                </ul>
            </nav>
        </header>
    );
}