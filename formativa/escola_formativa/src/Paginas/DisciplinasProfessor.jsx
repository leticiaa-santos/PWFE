import axios from 'axios';
import React, {useState, useEffect} from 'react';
import estilo from './Visualizar.module.css'

// Componente que mostra as disciplinas do professor
export function DisciplinasProfessor(){
    const [disciplinas, setDisciplina] = useState([]);
    
    // Carregamento dos dados ao abrir a tela
    useEffect(()=>{
        const token = localStorage.getItem('access_token');

        // Buscar disciplinas do professor
        axios.get('http://127.0.0.1:8000/api/professor/disciplinas/', {
            headers:{
                'Authorization': `Bearer ${token}`
            }
        })
        .then(response =>{
            setDisciplina(response.data);
        })
        .catch(error =>{
            console.error("Erro", error);
        });
    },[]);
    
    // Interface visual
    return(
        <div className={estilo.containerCard}>
            <h2 className={estilo.tituloCard}>Minhas Disciplinas</h2>

            <div className={estilo.listaCard}>
                {/* Percorre as disciplinas e exibe os dados */}
                {disciplinas.map(disciplina=>(
                    <div className={estilo.card} key={disciplina.id}>
                        <h3 className={estilo.nome}>{disciplina.nome}</h3>
                        <p><strong>Curso: </strong>{disciplina.curso}</p>
                        <p><strong>Descrição: </strong>{disciplina.descricao}</p>
                        <p><strong>Carga Horária: </strong>{disciplina.carga_horaria}</p>
                    </div>
                ))}
            </div>
        </div>

    );
}