import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import estilos from './Cadastrar.module.css';
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
 
const dateRegex = /^\d{4}-\d{2}-\d{2}$/;

const schemaAmbientes = z.object({
    data_inicio: z.string()
        .regex(dateRegex, 'Data de início deve estar no formato YYYY-MM-DD'),

    data_termino: z.string()
        .regex(dateRegex, 'Data de término deve estar no formato YYYY-MM-DD'),

    sala_reservada: z.number()
        .min(1, 'Informe a descrição da reserva')
        .max(255, 'Máximo de 255 caracteres'),

    periodo: z.string()
        .min(1, 'Informe o periodo')
        .max(8, 'Informe no máximo 100 caracteres'),

    disciplina: z.number({
        invalid_type_error: 'Selecione um professor válido'})
        .min(1, 'Informe a descrição da disciplina')
        .max(255, 'Máximo de 255 caracteres'),


    professor: z.number({
        invalid_type_error: 'Selecione um professor válido'})
        .min(1, 'Selecione um professor')
        }).refine((data) => {

    const inicio = new Date(data.data_inicio);
    const fim = new Date(data.data_termino);
    return inicio <= fim;

}, {
    message: 'A data de término deve ser posterior à de início'
});

 
export function AmbienteEditar() {
 
    const [professores, setProfessores] = useState([]);
    const [salas, setSalas] = useState([]);
    const [disciplinas, setDisciplinas] = useState([]);
    const { id } = useParams();
    const navigate = useNavigate();
 
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm({
        resolver: zodResolver(schemaAmbientes)
    });
 
    useEffect(() => {
        async function buscarProfessores() {
            try {
                const token = localStorage.getItem('access_token');
                const response = await axios.get('http://127.0.0.1:8000/api/usuario/', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                setProfessores(response.data);
                //Preenche o formulários com os dados do registro do ID
                 const resAmbiente = await axios.get(`http://127.0.0.1:8000/api/reservas/${id}/`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
 
                // Preenche o formulário
                reset(resAmbiente.data.reserva);
 
            } catch (error) {
                console.error("Erro ao carregar professores", error);
            }
        }

        async function buscarSalas() {
            try {
                const token = localStorage.getItem('access_token');
                const response = await axios.get('http://127.0.0.1:8000/api/sala/', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                setSalas(response.data);
                //Preenche o formulários com os dados do registro do ID
                 const resAmbiente = await axios.get(`http://127.0.0.1:8000/api/reservas/${id}/`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
 
                // Preenche o formulário
                reset(resAmbiente.data.reserva);
 
            } catch (error) {
                console.error("Erro ao carregar salas", error);
            }
        }

        async function buscarDisciplinas() {
            try {
                const token = localStorage.getItem('access_token');
                const response = await axios.get('http://127.0.0.1:8000/api/disciplinas/', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                setDisciplinas(response.data);
                //Preenche o formulários com os dados do registro do ID
                 const resAmbiente = await axios.get(`http://127.0.0.1:8000/api/reservas/${id}/`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
 
                // Preenche o formulário
                reset(resAmbiente.data.reserva);
 
            } catch (error) {
                console.error("Erro ao carregar disciplinas", error);
            }
        }

        buscarDisciplinas();
        buscarSalas();
        buscarProfessores();
    }, []);
 
    async function obterDadosFormulario(data) {
      console.log("Dados do formulário:", data);
        try {
            const token = localStorage.getItem('access_token');
 
            const response = await axios.put(
                `http://127.0.0.1:8000/api/reservas/${id}/`,
                data,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                }
            );
 
            console.log('Reserva editada com sucesso!', response.data);
            alert('Reserva editada com sucesso!');
            reset();
            navigate('/inicial/ambiente');
 
        } catch (error) {
            console.error('Erro ao editar reserva', error);
            alert("Erro ao editar reserva");
        }
    }
 
    return (
        <div className={estilos.conteiner}>
           
            <form className={estilos.loginForm} onSubmit={handleSubmit(obterDadosFormulario)}>
                <h2 className={estilos.titulo}>Atualização de Reserva</h2>
                <label className ={estilos.nomeCampo} >Data início</label>
                <input
                    type='date'                        
                    className={estilos.inputField}
                    {...register('data_inicio')}
                    placeholder="dd/mm/aaaa"
                />
                {errors.data_inicio && <p className={estilos.error}>{errors.data_inicio.message}</p>}
            

                <label className ={estilos.nomeCampo}>Data término</label>
                <input
                    type='date'
                    className={estilos.inputField}
                    {...register('data_termino')}
                    placeholder="dd/mm/aaaa"
                />
                {errors.data_termino && <p className={estilos.error}>{errors.data_termino.message}</p>}
                

                <label className ={estilos.nomeCampo}>Período</label>
                <input
                    className={estilos.inputField}
                    {...register('periodo')}
                    placeholder="Manhã/Tarde/Noite"
                />
                {errors.periodo && <p className={estilos.error}>{errors.periodo.message}</p>}
                
                <label className ={estilos.nomeCampo}>Sala</label>
                <select className={estilos.inputField}
                {...register('sala_reservada', { valueAsNumber: true })}>
                    <option  value="">Selecione uma sala</option>
                    {salas.map((sala) => (
                        <option className={estilos.inputField} key={sala.id} value={sala.id}>
                            {sala.nome}
                        </option>
                    ))}
                </select>
                {errors.sala && <p className={estilos.error}>{errors.sala.message}</p>}


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


                <label className ={estilos.nomeCampo}>Disciplina</label>
                <select className={estilos.inputField}
                {...register('disciplina', { valueAsNumber: true })}>
                    <option  value="">Selecione uma disciplina</option>
                    {disciplinas.map((disciplina) => (
                        <option className={estilos.inputField} key={disciplina.id} value={disciplina.id}>
                            {disciplina.nome}
                        </option>
                    ))}
                </select>
                {errors.disciplina && <p className={estilos.error}>{errors.disciplina.message}</p>}
               
 
                <div className={estilos.icones}>
                    <button className={estilos.submitButton} type="submit">
                        Atualizar
                    </button>
                </div>
            </form>
        </div>
    );
}