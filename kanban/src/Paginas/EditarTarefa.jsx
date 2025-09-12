import axios from 'axios';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

//schema de validação de edição de tarefas

const schemaEditarTarefas = z.object({
    prioridade: z.enum(['baixa', 'media', 'alta'], {
        errorMap: () => ({message: "Escolha uma prioridade"})
    }),
    status: z.enum(['a fazer', 'fazendo', 'feito'],{
        errorMap: () => ({message: "Escolha o status da tarefa"}),
    })
})

export function EditarTarefa () {
    const { id } = useParams(); //pega o ID que foi passado na rota
    const [tarefa, setTarefa] = useState(null);

    const{
        register,
        handleSubmit,
        formState: {errors},
        reset,
    } = useForm({resolver: zodResolver(schemaEditarTarefas)});

    useEffect(() => {
        axios

        .get(`http://127.0.0.1:8000/api/tarefa/${id}/`)

        .then((res) => {
            console.log(res)
            setTarefa(res.data);
            reset({
                prioridade:res.data.prioridade,
                status: res.data.status,
            });
        })

        .catch ((err) => console.error("Erro ao buscar tarefa", err))       

    }, [id, reset]);

    async function salvarEdicao(data) {
        try{
            await axios.patch(`http://127.0.0.1:8000/api/tarefa/${id}/`, data);
            console.log("Os dados foram: ", data);
            alert("Tarefa atualizada com sucesso")
        } catch (err) {
            console.error("Algo deu errado", err);
            alert("Houve um erro ao editar a tarefa")
        }
    }

    if (!tarefa) {
        return <p>Carregando tarefa...</p>;
    }

    return(
        <section>
            <h2>Editar Tarefa</h2>

            <form onSubmit={handleSubmit(salvarEdicao)}>
                <label>Descrição:</label>
                <textarea value={tarefa.descricao} readOnly/>

                <label>Setor</label>
                <input type='text' value = {tarefa.nomeSetor} readOnly />

                <label>Prioridade:</label>
                <select {...register("prioridade")}>
                    <option value="">Selecione</option>
                    <option value="baixa">Baixa</option>
                    <option value="media">Média</option>
                    <option value="alta">Alta</option>
                </select>
                {errors.prioridade && <p>{errors.prioridade.message}</p>}

                <label>Status:</label>
                <select {...register("status")}>
                    <option value="">Selecione</option>
                    <option value="a fazer">A fazer</option>
                    <option value="fazendo">Fazendo</option>
                    <option value="feito">Feito</option>
                </select>
                {errors.status && <p>{errors.status.message}</p>}

                <button type='submit'>Editar</button>
            </form>
        </section>
    );


}