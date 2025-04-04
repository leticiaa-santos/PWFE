import estilo from './Card.module.css'

export function Card({ movie }){
    return(
        <div className={estilo.conteiner}>
            <h3>{movie.title}</h3>
            <img className={estilo.image} src={`http://image.tmdb.org/t/p/w500/${movie.poster_path}`} />
            <p>{movie.overview}</p>
        </div>
    );
}