import estilos from './Conteudo.module.css';
import { Card } from '../card/Card'
import { Lista } from '../lista/Lista';

export function Conteudo(){
    return(
        <main className={estilos.conteiner}>
            <Lista />
        </main>
    )
}