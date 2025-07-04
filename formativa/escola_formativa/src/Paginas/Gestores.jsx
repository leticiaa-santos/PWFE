import axios from 'axios';
import React, { useState, useEffect } from 'react';
import add  from '../assets/add.png';
import edit from '../assets/edit.png';
import deletar from '../assets/delete.png';
import estilo from './Visualizar.module.css'
import { Link, useNavigate } from 'react-router-dom';

// Componente que exibe e gerencia os gestores
export function Gestores(){
    
    // Estados para armazenar dados da API
    const [gestores, setGestores] = useState([]);
    const navigate = useNavigate();

    // Carregamento dos dados
    useEffect(() => {
        const token = localStorage.getItem('access_token');

        // Buscar gestores
        axios.get('http://127.0.0.1:8000/api/usuario/gestor/',{
            headers:{
                'Authorization': `Bearer ${token}`
            }
        })

        .then(response => {
            console.log("Dados recebidos:", response.data);
            const dados = response.data.results || response.data;
            setGestores(dados);
        })
        
        .catch(error => {
            console.error("Erro: ", error);
        });
    }, [])

    // Função para deletar gestor
    const handleDelete = (id) => {
        const confirmar = window.confirm('Tem certeza que deseja excluir este gestor?');
        if (!confirmar) return;
 
        const token = localStorage.getItem('access_token');
 
        axios.delete(`http://127.0.0.1:8000/api/usuario/${id}/`, {
            headers: {
            'Authorization': `Bearer ${token}`
            }
        })
        .then(() => {
            alert('Gestor excluído com sucesso!');
            setGestores(prev => prev.filter(gestor => gestor.id !== id));
            navigate('/inicial/gestor');
        })
        .catch(error => {
            console.error('Erro ao excluir gestor:', error);
            alert('Erro ao excluir o gestor.');
        });
    };

    // Interface principal da página
    return(

        <main className={estilo.container}>
            <h3 className={estilo.titulo}>Gestores</h3>

            {/* Botão de adicionar novo gestor */}
            <div className={estilo.topoAcoes}>
                <Link to="/inicial/gestorcadastrar" className={estilo.botaoAdicionar}>
                    <img className={estilo.iconeAdd} src={add} alt="Adicionar gestores" />
                </Link>
            </div>

            {/* Tabela de gestores */}
            <div className={estilo.tabelaWrapper}>
                <table className={estilo.tabelaDados}>
                    <thead>
                        <tr>
                            <th>Nome</th>
                            <th>Email</th>
                            <th>NI</th>
                            <th>Data de nascimento</th>
                            <th>Data de contratação</th>
                            <th>Telefone</th>
                            <th>Ação</th>
                        </tr>
                    </thead>
                    <tbody>
                        {gestores.map(gestor => (
                            <tr key={gestor.id}>
                                <td>{gestor.first_name} {gestor.last_name}</td>
                                <td>{gestor.email}</td>
                                <td>{gestor.ni}</td>
                                <td>{gestor.data_nascimento}</td>
                                <td>{gestor.data_contratacao}</td>
                                <td>{gestor.telefone}</td>
                                <td>
                                    <Link to={`/inicial/gestoreditar/${gestor.id}/`}>
                                        <img className={estilo.icone} src={edit}/>
                                    </Link>

                                    <img src={deletar} alt="Excluir" className={estilo.icone} onClick={() => handleDelete(gestor.id)}/>    
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </main>
    )
}