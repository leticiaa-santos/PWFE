import estilo from './Conteudo.module.css';
import { Menu } from './Menu';

export function Conteudo(){
    return(
        <main className={estilo.container}>
            <Menu />
        </main>
    );
}