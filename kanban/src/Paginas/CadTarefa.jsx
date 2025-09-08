import axios from 'axios';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState, useEffect } from 'react';

const PRIORIDADE_CHOICES = ["baixa", "media", "alta"];
const STATUS_CHOICES = ["a fazer", "fazendo", "feito"]

const schemaCadTarefa = z.object({
    descricao: z.string()
        .min(5, 'Insira ao menos 5 caracteres')
        .max(255, 'Insira até 255 caracteres'),
    nomeSetor: z.string()
        .min(1, 'Insira ao menos 1 caractere')
        .max(90, 'Insira até 90 caracteres')
        .regex(/^[^0-9]*$/, "Este campo não pode conter números"),
    prioridade: z.enum(PRIORIDADE_CHOICES, {
        errorMap: () => ({message: 'Escolha uma prioridade valida'}),
    }),
    status: z.enum(STATUS_CHOICES, {
        errorMap: () => ({message: 'Escolha um status válido'}),
    }),
    idUsuario: z.number(
        {invalid_type_error: 'Selecione um professor'})
        .min(1, 'selecione um professor')

});

export function CadTarefa () {

    const [usuarios, setUsuarios] = useState([]);

    const{
        register, // registra o que o usuário faz
        handleSubmit, // no momento que é feito o submit
        setValue,
        formState:{ errors }, // no formulário, se der errado, guarda os erros na variável "errors"
        reset
        }=useForm({
            resolver: zodResolver(schemaCadTarefa),
            mode: "onChange",
    });


    useEffect(() => {

        // Função que busca as tarefas, pois são chaves estrangeiras
        async function buscarUsuario() {
            try{
                const response = await axios.get('http://127.0.0.1:8000/api/usuario/',)
                setUsuarios(response.data);
            }catch(error){
                console.error("Erro ", error);
            }
            
        }
        buscarUsuario();
    }, []);

    async function obterDados(data) {
        console.log('dados informados pelo user:', data)
 
        // Para grande parte das interações com outra plataforma é necessário usar o try
        try {
            await axios.post("http://127.0.0.1:8000/api/tarefa/", data);
            alert("Tarefa cadastrada com sucesso");
            reset(); // limpar o formulário após o cadastro
        } catch (error) {
            alert("Algo deu errado, tente novamente")
            console.log("Erros", error)
        }
    }


    return(
        <form className="formularios" onSubmit={handleSubmit(obterDados)}>
            <h2>Cadastro de Tarefa</h2>
 
            <label>Descrição:</label>
            <textarea 
                placeholder='Descreva a tarefa' 
                {...register("descricao")} />
            {/*Vejo a variável errors no campo e exibo a mensagem para o usuário*/}
            {errors.descricao  && <p>{errors.descricao.message}</p>}
 
            <label>Nome do Setor</label>
            <input 
                type='text' 
                placeholder='setor A' 
                {...register("nomeSetor")} />
            {errors.nomeSetor && <p>{errors.nomeSetor.message}</p>}

            <label>Prioridade</label>
            <select name="" id="" {...register("prioridade")}>
                <option value="">Selecione a prioridade...</option>
                {PRIORIDADE_CHOICES.map((prioridade) => (
                    <option key={prioridade} value={prioridade}>
                        {prioridade}
                    </option>
                ))}
               
            </select>

            <input
                type="hidden"
                value="a fazer"
                {...register('status')}
            />

            <label>Usuário:</label>
            <select
            {...register('idUsuario', { valueAsNumber: true })}>
                <option  value="">Selecione um usuário</option>
                {usuarios.map((usuario) => (
                    <option key={usuario.id} value={usuario.id}>
                        {usuario.nome}
                    </option>
                ))}
            </select>
            {errors.idUsuario && <p>{errors.idUsuario.message}</p>}
 
            <button type='submit'>Cadastrar</button>
 
        </form>
    );
}