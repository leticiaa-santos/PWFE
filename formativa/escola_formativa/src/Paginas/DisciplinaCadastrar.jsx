import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import React, {useEffect, useState} from 'react';

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

    const{
        register,
        handleSubmit,
        formState: {errors},
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
                data,{
                    headers:{
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                }
            );
            alert("Disciplina cadastrada com sucesso");
            reset();
        }catch(error){
            console.error("Erro", error)
            alert("Erro ao cadastrar")
        }
        
    }
    
    return(
        <></>
    )
}