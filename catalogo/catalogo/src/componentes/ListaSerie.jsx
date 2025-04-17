import axios from "axios";
import React, {useState, useEffect} from "react";
import { CardSerie } from "./CardSerie";
import { ModalSerie } from "./ModalSerie";
import estilos from './ListaSerie.module.css';

const API_URL = 'https://api.themoviedb.org/3';
const API_KEY = 'af26cce282aecf5c6cc39a264f29d0a7';

export function ListaSerie(){
    const [series, setSeries] = useState([]);
    const [selectedSerie, setSelectedSerie] = useState(null);

    useEffect(() => {
        axios.get(`${API_URL}/tv/popular?api_key=${API_KEY}&language=pt-BR`)

            .then(response => {
                console.log(response.data.results);
                setSeries(response.data.results);
            })
            .catch(error => {
                console.log('erro', error);
            });

    }, []);

    const handleOpenModal = (series) => {
        setSelectedSerie(series);
    }

    const handleCloseModal = () => {
        setSelectedSerie(null)
    }

    return(
        <div className={estilos.conteiner}>
            <figure>
                {series.map(serie => (
                    <CardSerie key={serie.id}
                    serie={serie}
                    onOpenModal = {handleOpenModal}
                    />
                ))}
            </figure>
            {selectedSerie &&(<ModalSerie serie={selectedSerie} onClose = {handleCloseModal}/>)}
        </div>
    )
    
}