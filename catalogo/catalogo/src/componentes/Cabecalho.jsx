import estilos from './Cabecalho.module.css';

//estrutura básica para os componentes 
export function Cabecalho(){
    return(
        <header className={estilos.conteiner}>
            <h1 className={estilos.titulo}>LetFlix</h1>
        </header>
    )

}