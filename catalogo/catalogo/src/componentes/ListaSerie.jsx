import axios from "axios";
import React, {useState, useEffect} from "react";
import { CardSerie } from "./CardSerie";
import { ModalSerie } from "./ModalSerie";
import estilos from './ListaSerie.module.css';

// URL base e chave da API do TMDB
const API_URL = 'https://api.themoviedb.org/3';
const API_KEY = 'af26cce282aecf5c6cc39a264f29d0a7';

export function ListaSerie(){
    // Estado para armazenar as séries recebidas da API
    const [series, setSeries] = useState([]);

    // Estado para controlar a série selecionada (para o modal)
    const [selectedSerie, setSelectedSerie] = useState(null);

    // Hook useEffect é executado ao carregar o componente (lista as séries)
    useEffect(() => {
        axios.get(`${API_URL}/tv/popular?api_key=${API_KEY}&language=pt-BR`)

            .then(response => {
                console.log(response.data.results); // Verifica os dados no console
                setSeries(response.data.results); // Atualiza o estado com as séries
            })
            .catch(error => {
                console.log('erro', error); // mostra, no console, erros caso a requisição não funcione
            });

    }, []);

    // Abre o modal com os detalhes da série
    const handleOpenModal = (series) => {
        setSelectedSerie(series);
    }

    // Fecha o modal
    const handleCloseModal = () => {
        setSelectedSerie(null)
    }

    return(
        <>
            <h2 className={estilos.tituloDestaque}>Séries Destaques</h2>
            <div className={estilos.conteiner}>
                <figure>
                    {series.map(serie => (
                        <CardSerie key={serie.id}
                        serie={serie}
                        onOpenModal = {handleOpenModal}
                        />
                    ))}
                </figure>

                {/* Se uma série estiver selecionada, mostra o modal */}
                {selectedSerie &&(
                    <ModalSerie 
                        serie={selectedSerie} 
                        onClose = {handleCloseModal}
                    />
                )}
            </div>
        </>
        
    )
    
}