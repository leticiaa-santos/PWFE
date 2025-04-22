import estilo from './Card.module.css';

export function Card({ movie, onOpenModal}){
    return(
            <div className={estilo.conteiner}>
                <h3 className={estilo.titulo}>{movie.title}</h3>
                <img className={estilo.image} src={`http://image.tmdb.org/t/p/w500/${movie.poster_path}`} onClick={() => onOpenModal(movie)}/>
                {/* <p>{movie.overview}</p> */}
            </div>
    );
}