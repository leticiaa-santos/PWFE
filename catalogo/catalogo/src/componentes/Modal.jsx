import estilos from './Modal.module.css';

export function Modal({ movie, onClose }) {

    // se não houver filme selecionado, não renderiza nada
    if (!movie) {
        return null;
    }

    console.log(movie); // mostra o filme no console (para debug)

    return (
        // fundo escurecido do modal
        <div className={estilos.modalback}>
            <div className={estilos.modalContainer}>
                <div className={estilos.modalHeader}>
                    
                    {/* botão de fechar o modal */}
                    <div className={estilos.containerButton}>
                        <button onClick={onClose}>x</button>
                    </div>

                    {/* título do filme */}
                    <h2>{movie.title}</h2>

                    {/* imagem do pôster do filme */}
                    <img 
                        className={estilos.imgModal} 
                        src={`http://image.tmdb.org/t/p/w500/${movie.poster_path}`} 
                    />

                    {/* mostra os detalhes do filme */}
                    <div>
                        <ul className={estilos.movieDetails}>
                            <li>{`Popularidade: ${movie.popularity}`}</li>
                            <li>{`Data de Lançamento: ${movie.release_date}`}</li>
                            <li>{`Quantidade de votos: ${movie.vote_count}`}</li>
                            <li>{`Sinopse: ${movie.overview}`}</li>
                        </ul>
                    </div>

                </div>
            </div>
        </div>
    );
}
