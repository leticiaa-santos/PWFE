import estilos from './ModalSerie.module.css';

export function ModalSerie({ serie, onClose }){
    if(!serie){
        return null;
    }
    console.log(serie)

    return(
        <div className={estilos.modalback}>
            <div className={estilos.modalContainer}>
                <div className={estilos.modalHeader}>
                    <div className={estilos.containerButton}>
                        <button onClick={onClose}>x</button>
                    </div>
                    <h2>{serie.name}</h2>
                    <img className={estilos.imgModal} src={`http://image.tmdb.org/t/p/w500/${serie.poster_path}`} />
                    <div>
                        <ul className={estilos.serieDetails}>
                            <li>{`Popularidade: ${serie.popularity}`}</li>
                            <li>{`Data de Lançamento: ${serie.first_air_date}`}</li>
                            <li>{`Quantidade de votos: ${serie.vote_count}`}</li>
                            <li>{`Sinopse: ${serie.overview}`}</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}