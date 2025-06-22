import axios from 'axios'; // permime chamar uma API
import React, {useState, useEffect} from 'react';
//effect mostra isso em tela
import estilo from './Visualizar.module.css'

export function AmbientesProfessor(){
    //crio uma variável disciplina que recebe os dados da api, e é controlada pelo state
    const [ambientes, setAmbientes] = useState([]);
    const [disciplinas, setDisciplinas] = useState([]);
    const [salas, setSalas] = useState([]);
    
    //()parametros, {}script, []dependencias, aqui mostro o que vou chamar 
    useEffect(()=>{
        const token = localStorage.getItem('access_token');

        //Chama o endereço da api que eu quero consumir
        axios.get('http://127.0.0.1:8000/api/professor/reservas/', {
            headers:{
                'Authorization': `Bearer ${token}`
            }
        })
        .then(response =>{
            setAmbientes(response.data);
        })
        .catch(error =>{
            console.error("Erro", error);
        });

        //busca de salas
        axios.get('http://127.0.0.1:8000/api/sala/', {
            headers:{
                'Authorization': `Bearer ${token}`
            }
        })
        .then(response => {
            const salaPorId = {};
            response.data.forEach(sala => {
                salaPorId[sala.id] = `${sala.nome}`;
            });
            setSalas(salaPorId);
        })
        .catch(error => {
            console.error("Erro ao buscar a sala ", error);
        });

        //busca de disciplinas
        axios.get('http://127.0.0.1:8000/api/disciplinas/', {
            headers:{
                'Authorization': `Bearer ${token}`
            }
        })
        .then(response => {
            const disciplinaPorId = {};
            response.data.forEach(disciplina => {
                disciplinaPorId[disciplina.id] = `${disciplina.nome}`;
            });
            setDisciplinas(disciplinaPorId);
        })
        .catch(error => {
            console.error("Erro ao buscar a disciplina ", error);
        });
    },[]);
    
    return(
        <div className={estilo.containerCard}>
            <h2 className={estilo.tituloCard}>Minhas Reservas</h2>

            <div className={estilo.listaCard}>
                {ambientes.map(ambiente=>(
                    <div className={estilo.card} key={ambiente.id}>
                        <h3 className={estilo.nome}>{salas[ambiente.sala_reservada]}</h3>
                        <p><strong>Data início: </strong>{ambiente.data_inicio}</p>
                        <p><strong>Data término: </strong>{ambiente.data_termino}</p>
                        <p><strong>Período: </strong>{ambiente.periodo}</p>
                        <p><strong>Disciplina: </strong>{disciplinas[ambiente.disciplina]}</p>
                    </div>
                ))}
            </div>
        </div>

    );
}