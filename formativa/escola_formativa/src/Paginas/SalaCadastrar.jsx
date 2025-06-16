import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import estilos from './Cadastrar.module.css'
import { useNavigate } from 'react-router-dom';

const schemaSala = z.object({
    nome: z.string()
        .min(1, 'Informe o nome da sala')
        .max(255, 'Máximo de 255 caracteres'),

    capacidade: z.number(
        {invalid_type_error: 'Informe uma capacidade'})
        .int("Digite um valor inteiro")
        .min(1, 'Informe um valor')
        .max(60, 'A capacidade máxima é 60'),
})

export function SalaCadastrar(){
    
    const navigate = useNavigate();

    const{
        register,
        handleSubmit,
        formState: {errors},
        reset
    } = useForm({
        resolver: zodResolver(schemaSala)
    });


    async function obterDadosFormulario(data) {
        console.log("dados do formulário ", data);

        try{
            const token = localStorage.getItem('access_token');
            const response = await axios.post(
                'http://127.0.0.1:8000/api/sala/',
                data,
                {
                    headers:{
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                }
            );
            console.log('Sala cadastrada com sucesso!', response.data);
            alert('Sala cadastrada com sucesso!');
            reset();
            navigate('/inicial/sala');
       
        } catch (error) {
              console.error('Erro ao cadastrar sala', error);
              alert("Erro ao cadastrar sala");
        }
    }
       
    return (
        <div className={estilos.container}>
            
            <form className={estilos.loginForm} onSubmit={handleSubmit(obterDadosFormulario)}>
                
                <h2 className={estilos.titulo}>Cadastro de Sala</h2>

                <label className ={estilos.nomeCampo}>Nome</label>
                <input
                    className={estilos.inputField}
                    {...register('nome')}
                    placeholder="Nome da sala"
                />
                {errors.nome && 
                <p className={estilos.error}>
                    {errors.nome.message}
                </p>}

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
                        Cadastrar
                    </button>
                </div>
            </form>
        </div>
    );
}