import axios from 'axios';
import React, { useState, useEffect } from 'react';
import add  from '../assets/add.png';
import edit from '../assets/edit.png';
import deletar from '../assets/delete.png';
import estilo from './Visualizar.module.css'
import { Link, useNavigate } from 'react-router-dom';

export function Ambientes(){
    
    const [ambientes, setAmbientes] = useState([]);
    const [professores, setProfessores] = useState([]);
    const [salas, setSalas] = useState([]);
    const [disciplinas, setDisciplinas] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('access_token');

        axios.get('http://127.0.0.1:8000/api/reservas/',{
            headers:{
                'Authorization': `Bearer ${token}`
            }
        })
        //se der bom (200) quero popular a minha variável disciplina com os dados da API
        .then(response => {
            setAmbientes(response.data);
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
    }, [])

    const handleDelete = (id) => {
        const confirmar = window.confirm('Tem certeza que deseja excluir esta reserva?');
        if (!confirmar) return;
 
        const token = localStorage.getItem('access_token');
 
        axios.delete(`http://127.0.0.1:8000/api/reservas/${id}/`, {
            headers: {
            'Authorization': `Bearer ${token}`
            }
        })
        .then(() => {
            alert('Ambiente excluído com sucesso!');
            setDisciplinas(prev => prev.filter(dis => dis.id !== id));
            navigate('/inicial/ambiente');
        })
        .catch(error => {
            console.error('Erro ao excluir ambiente:', error);
            alert('Erro ao excluir o ambiente.');
        });
    };

    return(

        <main className={estilo.container}>
            <h3 className={estilo.titulo}>Ambientes</h3>
            <div className={estilo.topoAcoes}>
                <Link to="/inicial/ambicadastrar" className={estilo.botaoAdicionar}>
                    <img className={estilo.iconeAdd} src={add} alt="Adicionar ambientes" />
                </Link>
            </div>
            <div className={estilo.tabelaWrapper}>
                <table className={estilo.tabelaDados}>
                    <thead>
                        <tr>
                            <th>Data início</th>
                            <th>Data término</th>
                            <th>Período</th>
                            <th>Sala criada</th>
                            <th>Professor</th>
                            <th>Disciplina</th>
                        </tr>
                    </thead>
                    <tbody>
                        {ambientes.map(ambiente => (
                            <tr key={ambiente.id}>
                                <td>{ambiente.data_inicio}</td>
                                <td>{ambiente.data_termino}</td>
                                <td>{ambiente.periodo}</td>
                                <td>{salas[ambiente.sala_reservada]}</td>
                                <td>{professores[ambiente.professor]}</td>
                                <td>{disciplinas[ambiente.disciplina]}</td>
                                <td>
                                    <Link to={`/inicial/ambieditar/${ambiente.id}/`}>
                                        <img className={estilo.icone} src={edit}/>
                                    </Link>

                                    <img src={deletar} alt="Excluir" className={estilo.icone} onClick={() => handleDelete(ambiente.id)}/>    
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </main>
    )
}