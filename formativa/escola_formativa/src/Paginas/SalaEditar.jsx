import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import estilos from './Cadastrar.module.css';
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
 
const schemaSala = z.object({
    nome: z.string()
        .min(1, 'Informe o nome da sala')
        .max(255, 'Máximo de 255 caracteres'),

    capacidade: z.number(
        {invalid_type_error: 'Informe uma capacidade'})
        .int("Digite um valor inteiro")
        .min(1, 'Informe um valor')
        .max(60, 'A capacidade máxima é 60'),
});

export function SalaEditar() {
    
    const { id } = useParams();
    const navigate = useNavigate();
 
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm({
        resolver: zodResolver(schemaSala)
    });
 
    useEffect(() => {


        async function carregarSala() {
        try {
            const token = localStorage.getItem('access_token');
            const response = await axios.get(`http://127.0.0.1:8000/api/sala/${id}/`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            // Preenche os campos do formulário com os dados da sala
            reset(response.data.sala);

        } catch (error) {
            console.error("Erro ao carregar dados da sala", error);
            alert("Erro ao carregar os dados da sala");
        }
    }

    carregarSala();
}, [id, reset]);
 
    async function obterDadosFormulario(data) {
      console.log("Dados do formulário:", data);
        try {
            const token = localStorage.getItem('access_token');
 
            const response = await axios.put(
                `http://127.0.0.1:8000/api/sala/${id}/`,
                data,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                }
            );
 
            console.log('Sala atualizada com sucesso!', response.data);
            alert('Sala atualizada com sucesso!');
            reset();
            navigate('/inicial/sala');
 
        } catch (error) {
            console.error('Erro ao atualizar sala', error);
            alert("Erro ao atualizar sala");
        }
    }
 
    return (
        <div className={estilos.conteiner}>
           
            <form className={estilos.loginForm} onSubmit={handleSubmit(obterDadosFormulario)}>
                    <h2 className={estilos.titulo}>Atualização de Sala</h2>
                    <label className ={estilos.nomeCampo} >Nome</label>
                    <input                        
                        className={estilos.inputField}
                        {...register('nome')}
                        placeholder="Nome da Sala"
                    />
                    {errors.nome && <p className={estilos.error}>{errors.nome.message}</p>}
 
                    <label className ={estilos.nomeCampo}>Capacidade</label>
                    <input
                        type="number"
                        className={estilos.inputField}
                        {...register('capacidade', { valueAsNumber: true })}
                        placeholder="20"
                    />
                    {errors.capacidade &&
                    <p className={estilos.error}>
                        {errors.capacidade.message}
                    </p>}
               
 
                <div className={estilos.icones}>
                    <button className={estilos.submitButton} type="submit">
                        Atualizar
                    </button>
                </div>
            </form>
        </div>
    );
}