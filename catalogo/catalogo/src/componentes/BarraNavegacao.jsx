import estilos from './BarraNavegacao.module.css';
import { Link } from 'react-router-dom';


// estrutura
export function BarraNavegacao(){
    return(
        <nav className={estilos.conteiner}>
            <ul>
                <Link className={estilos.link} to='/'>
                    <li>
                        <span class="material-symbols-outlined">home</span>
                        Home
                    </li>
                </Link>
                <Link className={estilos.link} to='series'>
                    <li>
                        <span class="material-symbols-outlined">movie</span>
                        Séries
                    </li>
                </Link>
                <Link className={estilos.link} to='perfil'>
                    <li>
                        <span class="material-symbols-outlined">person</span>
                        Perfil
                    </li>
                </Link>
            </ul>
        </nav>
    )
}