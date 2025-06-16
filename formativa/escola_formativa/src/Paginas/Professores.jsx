import axios from 'axios';
import React, { useState, useEffect } from 'react';
import add  from '../assets/add.png';
import edit from '../assets/edit.png';
import deletar from '../assets/delete.png';
import estilo from './Visualizar.module.css'
import { Link, useNavigate } from 'react-router-dom';

export function Professores(){
    
    const [professores, setProfessores] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('access_token');

        axios.get('http://127.0.0.1:8000/api/usuario/professor/',{
            headers:{
                'Authorization': `Bearer ${token}`
            }
        })
        //se der bom (200) quero popular a minha variável disciplina com os dados da API
        .then(response => {
            console.log("Dados recebidos:", response.data);
            const dados = response.data.results || response.data;
            setProfessores(dados);
        })
        //se der ruim
        .catch(error => {
            console.error("Erro: ", error);
        });
    }, [])

    const handleDelete = (id) => {
        const confirmar = window.confirm('Tem certeza que deseja excluir este professor?');
        if (!confirmar) return;
 
        const token = localStorage.getItem('access_token');
 
        axios.delete(`http://127.0.0.1:8000/api/usuario/${id}/`, {
            headers: {
            'Authorization': `Bearer ${token}`
            }
        })
        .then(() => {
            alert('Professor excluído com sucesso!');
            setProfessores(prev => prev.filter(professor => professor.id !== id));
            navigate('/inicial/professor');
        })
        .catch(error => {
            console.error('Erro ao excluir professor:', error);
            alert('Erro ao excluir o professor.');
        });
    };

    return(

        <main className={estilo.container}>
            <h3 className={estilo.titulo}>Professores</h3>
            <div className={estilo.topoAcoes}>
                <Link to="/inicial/profcadastrar" className={estilo.botaoAdicionar}>
                    <img className={estilo.iconeAdd} src={add} alt="Adicionar professores" />
                </Link>
            </div>
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
                        {professores.map(professor => (
                            <tr key={professor.id}>
                                <td>{professor.first_name} {professor.last_name}</td>
                                <td>{professor.email}</td>
                                <td>{professor.ni}</td>
                                <td>{professor.data_nascimento}</td>
                                <td>{professor.data_contratacao}</td>
                                <td>{professor.telefone}</td>
                                <td>
                                    <Link to={`/inicial/profeditar/${professor.id}/`}>
                                        <img className={estilo.icone} src={edit}/>
                                    </Link>

                                    <img src={deletar} alt="Excluir" className={estilo.icone} onClick={() => handleDelete(professor.id)}/>    
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </main>
    )
}