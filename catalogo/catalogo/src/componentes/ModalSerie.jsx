import estilos from './ModalSerie.module.css';

export function ModalSerie({ serie, onClose }){

    // se não houver série selecionada, não renderiza nada
    if(!serie){
        return null;
    }

    console.log(serie) // mostra a série no console (para debug)

    return(

        // fundo escurecido do modal
        <div className={estilos.modalback}>
            <div className={estilos.modalContainer}>
                <div className={estilos.modalHeader}>

                    {/* botão de fechar o modal */}
                    <div className={estilos.containerButton}>
                        <button onClick={onClose}>x</button>
                    </div>

                    {/* título da série */}
                    <h2>{serie.name}</h2>

                    {/* imagem do pôster da série */}
                    <img className={estilos.imgModal} src={`http://image.tmdb.org/t/p/w500/${serie.poster_path}`} />
                    <div>

                        {/* mostra os detalhes da série */}
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