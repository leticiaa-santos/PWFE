import axios from "axios";
import React, {useState, useEffect} from "react";
import { Card } from './Card'; 
import { Modal } from './Modal'
import estilos from './Lista.module.css'

// URL base e chave da API do TMDB
const API_URL = 'https://api.themoviedb.org/3';
const API_KEY = 'af26cce282aecf5c6cc39a264f29d0a7';

export function Lista(){
    // Estado para armazenar os filmes recebidos da API
    const [movies, setMovies] = useState([]);

    // Estado para controlar o filme selecionado (para o modal)
    const [SelectedMovie, setSelectedMovie] = useState(null);

    // Hook useEffect é executado ao carregar o componente (lista os filmes)
    useEffect(() => {
        axios.get(`${API_URL}/movie/popular?api_key=${API_KEY}&language=pt-BR`)
            .then(response => {
                console.log(response.data.results); // Verifica os dados no console
                setMovies(response.data.results); // Atualiza o estado com os filmes
            })
            .catch(error => {
                console.log('erro', error); // mostra, no console, erros caso a requisição não funcione
            });
    }, []);

    // Abre o modal com os detalhes do filme
    const handleOpenModal = (movie) => {
        setSelectedMovie(movie);
    }

    // Fecha o modal
    const handleCloseModal = () => {
        setSelectedMovie(null);
    }

    return(
        <>
            <h2 className={estilos.tituloDestaque}>Filmes Destaques</h2>
            <div className={estilos.conteiner}>
                <figure>
                    {movies.map(movie => (
                        <Card 
                            key={movie.id}
                            movie={movie}
                            onOpenModal={handleOpenModal} 
                        />
                    ))}
                </figure>

                {/* Se um filme estiver selecionado, mostra o modal */}
                {SelectedMovie && (
                    <Modal 
                        movie={SelectedMovie} 
                        onClose={handleCloseModal}
                    />
                )}
            </div>
        </>
    )
}
