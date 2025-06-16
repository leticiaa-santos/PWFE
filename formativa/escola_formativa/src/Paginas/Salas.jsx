import axios from 'axios';
import React, { useState, useEffect } from 'react';
import add  from '../assets/add.png';
import edit from '../assets/edit.png';
import deletar from '../assets/delete.png';
import estilo from './Visualizar.module.css'
import { Link, useNavigate } from 'react-router-dom';

export function Salas(){
    
    const [salas, setSalas] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('access_token');

        axios.get('http://127.0.0.1:8000/api/sala/',{
            headers:{
                'Authorization': `Bearer ${token}`
            }
        })
        //se der bom (200) quero popular a minha variável disciplina com os dados da API
        .then(response => {
            setSalas(response.data);
        })
        //se der ruim
        .catch(error => {
            console.error("Erro: ", error);
        });
    }, [])

    const handleDelete = (id) => {
        const confirmar = window.confirm('Tem certeza que deseja excluir esta sala?');
        if (!confirmar) return;
 
        const token = localStorage.getItem('access_token');
 
        axios.delete(`http://127.0.0.1:8000/api/sala/${id}/`, {
            headers: {
            'Authorization': `Bearer ${token}`
            }
        })
        .then(() => {
            alert('Sala excluída com sucesso!');
            setSalas(prev => prev.filter(sala => sala.id !== id));
            navigate('/inicial/sala');
        })
        .catch(error => {
            console.error('Erro ao excluir sala:', error);
            alert('Erro ao excluir a sala.');
        });
    };

    return(

        <main className={estilo.container}>
            <h3 className={estilo.titulo}>Salas</h3>
            <div className={estilo.topoAcoes}>
                <Link to="/inicial/salacadastrar" className={estilo.botaoAdicionar}>
                    <img className={estilo.iconeAdd} src={add} alt="Adicionar salas" />
                </Link>
            </div>
            <div className={estilo.tabelaWrapper}>
                <table className={estilo.tabelaDados}>
                    <thead>
                        <tr>
                            <th>Nome</th>
                            <th>Capacidade</th>
                            <th>Ação</th>
                        </tr>
                    </thead>
                    <tbody>
                        {salas.map(sala => (
                            <tr key={sala.id}>
                                <td>{sala.nome}</td>
                                <td>{sala.capacidade}</td>
                                <td>
                                    <Link to={`/inicial/salaeditar/${sala.id}/`}>
                                        <img className={estilo.icone} src={edit}/>
                                    </Link>

                                    <img src={deletar} alt="Excluir" className={estilo.icone} onClick={() => handleDelete(sala.id)}/>    
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </main>
    )
}