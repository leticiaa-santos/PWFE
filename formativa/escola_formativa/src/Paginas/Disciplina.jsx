import axios from 'axios';
import React, { useState, useEffect } from 'react';
import add  from '../assets/add.png';
import edit from '../assets/edit.png';
import deletar from '../assets/delete.png';
import estilo from './Visualizar.module.css'

export function Disciplina(){
    
    const [disciplinas, setDisciplinas] = useState([]);
    const [professores, setProfessores] = useState([]);

    useEffect(() => {
        const token = localStorage.getItem('access_token');

        axios.get('http://127.0.0.1:8000/api/disciplinas/',{
            headers:{
                'Authorization': `Bearer ${token}`
            }
        })
        //se der bom (200) quero popular a minha variável disciplina com os dados da API
        .then(response => {
            setDisciplinas(response.data);
        })
        //se der ruim
        .catch(error => {
            console.error("Erro: ", error);
        });

        //busca dos professores
        axios.get('http://127.0.0.1:8000/api/usuario/', {
            headers:{
                'Authorization': `Bearer ${token}`
            }
        })
        .then(response => {
            const professorPorId = {};
            response.data.forEach(prof => {
                professorPorId[prof.id] = `${prof.first_name} ${prof.last_name}`;
            });
            setProfessores(professorPorId);
        })
        .catch(error => {
            console.error("Erro ao buscar o professor ", error);
        });
    }, [])

    return(

        <main className={estilo.container}>
            <h3 className={estilo.titulo}>Disciplinas</h3>
            <div className={estilo.topoAcoes}>
                <img className={estilo.iconeAdd} src={add} alt="Adicionar disciplina" />
            </div>
            <div className={estilo.tabelaWrapper}>
                <table className={estilo.tabelaDados}>
                    <thead>
                        <tr>
                            <th>Nome</th>
                            <th>Curso</th>
                            <th>Carga Horária</th>
                            <th>Descrição</th>
                            <th>Professor</th>
                            <th>Ação</th>
                        </tr>
                    </thead>
                    <tbody>
                        {disciplinas.map(disciplina => (
                            <tr key={disciplina.id}>
                                <td>{disciplina.nome}</td>
                                <td>{disciplina.curso}</td>
                                <td>{disciplina.carga_horaria}</td>
                                <td>{disciplina.descricao}</td>
                                <td>{professores[disciplina.professor]}</td>
                                <td>
                                    <img className={estilo.icone} src={edit}/>
                                    <img className={estilo.icone} src={deletar}/>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </main>
    )
}