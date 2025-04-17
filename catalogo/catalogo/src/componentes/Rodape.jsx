import estilos from './Rodape.module.css'
export function Rodape(){
    return(
        <footer className={estilos.conteiner}>
            <h1 className={estilos.titulo}>LetFlix</h1>
            <p className={estilos.descricao}>Aqui você tem acesso aos seus filmes favoritos de maneira muito fácil</p>
        </footer>
    )
}