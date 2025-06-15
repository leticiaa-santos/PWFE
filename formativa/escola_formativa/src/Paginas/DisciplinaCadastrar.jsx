import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import React, {useEffect, useState} from 'react';
import estilos from './Cadastrar.module.css'
import { useNavigate } from 'react-router-dom';

const schemaDisciplinas = z.object({
    nome: z.string()
        .min(1, 'Informe um nome')
        .max(100, 'Informe no máximo 100 caracteres'),
    curso: z.string()
        .min(1, 'Informe o curso')
        .max(100, 'Informe no máximo 100 caracteres'),
    carga_horaria: z.number(
        {invalid_type_error: 'Informe uma carga horária'})
        .int("Digite um valor inteiro")
        .min(1, 'Informe um valor')
        .max(260, 'A carga horária máxima é de 260h'),
    descricao: z.string()
        .min(1, 'Informe a descrição')
        .max(255, 'Informe no máximo 255 caracteres'),
    professor: z.number(
        {invalid_type_error: 'Selecione um professor'})
        .min(1, 'selecione um professor')

});

export function DisciplinaCadastrar(){
    
    const [professores, setProfessores] = useState([]);
    const navigate = useNavigate();

    const{
        register,
        handleSubmit,
        formState: {errors},
        reset
    } = useForm({
        resolver: zodResolver(schemaDisciplinas)
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
        buscarProfessores();
    }, []);

    async function obterDadosFormulario(data) {
        console.log("dados do formulário ", data);

        try{
            const token = localStorage.getItem('access_token');
            const response = await axios.post(
                'http://127.0.0.1:8000/api/disciplinas/',
                data,
                {
                    headers:{
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                }
            );
            console.log('Disciplina cadastrada com sucesso!', response.data);
            alert('Disciplina cadastrada com sucesso!');
            reset();
            navigate('/inicial/disciplina');
       
        } catch (error) {
              console.error('Erro ao cadastrar disciplina', error);
              alert("Erro ao cadastrar disciplina");
        }
    }
       
    return (
        <div className={estilos.container}>
            
            <form className={estilos.loginForm} onSubmit={handleSubmit(obterDadosFormulario)}>
                    <h2 className={estilos.titulo}>Cadastro de Disciplina</h2>
                    <label className ={estilos.nomeCampo} >Nome da Disciplina</label>
                    <input                        
                        className={estilos.inputField}
                        {...register('nome')}
                        placeholder="Nome"
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
                    {errors.carga_horaria &&
                    <p className={estilos.error}>
                        {errors.carga_horaria.message}
                    </p>}
                

                <label className ={estilos.nomeCampo}>Descrição</label>
                <textarea
                    className={estilos.inputField}
                    {...register('descricao')}
                    placeholder="Descreva a disciplina com até 255 caracteres"
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