import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import React, {useEffect, useState} from 'react';
import estilos from './Cadastrar.module.css'

const schemaAmbientes = z.object({
    data_inicio: z.date(),
    data_termino: z.date(),
    periodo: z.string()
        .min(1, 'Informe o periodo')
        .max(8, 'Informe no máximo 100 caracteres'),
    sala_reservada: z.number(
        {invalid_type_error: 'Selecione uma sala'})
        .min(1, 'selecione uma sala'),
    professor: z.number(
        {invalid_type_error: 'Selecione um professor'})
        .min(1, 'selecione um professor'),
    disciplina: z.number(
        {invalid_type_error: 'Selecione uma disciplina'})
        .min(1, 'selecione uma disciplina')

});

export function AmbienteCadastrar(){
    
    const [professores, setProfessores] = useState([]);
    const [salas, setSalas] = useState([]);
    const [disciplinas, setDisciplinas] = useState([]);

    const{
        register,
        handleSubmit,
        formState: {errors},
        reset
    } = useForm({
        resolver: zodResolver(schemaAmbientes)
    });

    useEffect(() => {

        async function buscarProfessores() {
            try{
                const token = localStorage.getItem('access_token');
                const response = await axios.get('http://127.0.0.1:8000/api/usuario/',{
                    headers:{
                        'Authorization': `Bearer ${token}`
                    }
                });
                    setProfessores(response.data);
            }catch(error){
                console.error("Erro ", error);
            }
            
        }

        async function buscarSalas() {
            try{
                const token = localStorage.getItem('access_token');
                const response = await axios.get('http://127.0.0.1:8000/api/sala/',{
                    headers:{
                        'Authorization': `Bearer ${token}`
                    }
                });
                    setSalas(response.data);
            }catch(error){
                console.error("Erro ", error);
            }
            
        }

        async function buscarDisciplinas() {
            try{
                const token = localStorage.getItem('access_token');
                const response = await axios.get('http://127.0.0.1:8000/api/disciplinas/',{
                    headers:{
                        'Authorization': `Bearer ${token}`
                    }
                });
                    setDisciplinas(response.data);
            }catch(error){
                console.error("Erro ", error);
            }
            
        }

        buscarDisciplinas();
        buscarSalas();
        buscarProfessores();

    }, []);

    async function obterDadosFormulario(data) {
        console.log("dados do formulário ", data);

        try{
            const token = localStorage.getItem('access_token');
            const response = await axios.post(
                'http://127.0.0.1:8000/api/reservas/',
                data,
                {
                    headers:{
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                }
            );
            console.log('Reserva cadastrada com sucesso!', response.data);
            alert('Reserva cadastrada com sucesso!');
            reset();
       
        } catch (error) {
              console.error('Erro ao cadastrar reserva', error);
              alert("Erro ao cadastrar reserva");
        }
    }
       
    return (
        <div className={estilos.container}>
            
            <form className={estilos.loginForm} onSubmit={handleSubmit(obterDadosFormulario)}>
                    <h2 className={estilos.titulo}>Cadastro de Reserva</h2>
                    <label className ={estilos.nomeCampo} >Nome da Disciplina</label>
                    <input                        
                        className={estilos.inputField}
                        {...register('nome')}
                        placeholder="Materia"
                    />
                    {errors.nome && <p className={estilos.error}>{errors.nome.message}</p>}
                

                    <label className ={estilos.nomeCampo}>Nome do curso</label>
                    <input
                        className={estilos.inputField}
                        {...register('curso')}
                        placeholder="Desenvolvimento de Sistema"
                    />
                    {errors.curso && <p className={estilos.error}>{errors.curso.message}</p>}
                

                    <label className ={estilos.nomeCampo}>Carga horária</label>
                    <input
                    type="number"
    
                        className={estilos.inputField}
                        {...register('carga_horaria', { valueAsNumber: true })}
                        placeholder="75"
                    />
                    {errors.cargaHoraria &&
                    <p className={estilos.error}>
                        {errors.cargaHoraria.message}
                    </p>}
                

                <label className ={estilos.nomeCampo}>Descrição</label>
                <textarea
                    className={estilos.inputField}
                    {...register('descricao')}
                    placeholder="Descreva o curso com até 2000 caracteres"
                    rows={5}
                    />
                    {errors.descricao && <p className={estilos.error}>{errors.descricao.message}</p>}
                
                    <label className ={estilos.nomeCampo}>Professor</label>
                    <select className={estilos.inputField}
                    {...register('professor', { valueAsNumber: true })}>
                        <option  value="">Selecione um professor</option>
                        {professores.map((prof) => (
                            <option className={estilos.inputField} key={prof.id} value={prof.id}>
                                {prof.first_name} {prof.last_name}
                            </option>
                        ))}
                    </select>
                    {errors.professor && <p className={estilos.error}>{errors.professor.message}</p>}
                

                <div className={estilos.icones}>
                    <button className={estilos.submitButton} type="submit">
                        Cadastrar
                    </button>
                </div>
            </form>
        </div>
    );
}