import estilo from './NotFound.module.css';

export function NotFound(){
    return(
        <main className={estilo.container}>
            <h1>404 NOT FOUND</h1>
            <h3>Essa página não existe</h3>
        </main>
    );
}