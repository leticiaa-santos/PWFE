import axios from 'axios';
import React, {useState, useEffect} from 'react'; 
import estilo from './Visualizar.module.css'; 

// Componente que mostra as reservas do professor

export function AmbientesProfessor(){

    // Estados para armazenar dados da API
    const [ambientes, setAmbientes] = useState([]);
    const [disciplinas, setDisciplinas] = useState([]);
    const [salas, setSalas] = useState([]);
    
    // Carregamento dos dados ao abrir a tela
    useEffect(()=>{
        const token = localStorage.getItem('access_token');

        // Buscar reservas do professor
        axios.get('http://127.0.0.1:8000/api/professor/reservas/', {
            headers:{ 'Authorization': `Bearer ${token}` }
        })
        .then(response => {
            setAmbientes(response.data);
        })
        .catch(error => {
            console.error("Erro", error);
        });

        // Buscar salas
        axios.get('http://127.0.0.1:8000/api/sala/', {
            headers:{ 'Authorization': `Bearer ${token}` }
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

        // Buscar disciplinas
        axios.get('http://127.0.0.1:8000/api/disciplinas/', {
            headers:{ 'Authorization': `Bearer ${token}` }
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

    }, []);
    
    
    // Interface visual
    return(
        <div className={estilo.containerCard}>
            <h2 className={estilo.tituloCard}>Minhas Reservas</h2>

            <div className={estilo.listaCard}>
                {/* Percorre as reservas e exibe os dados */}
                {ambientes.map(ambiente => (
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
