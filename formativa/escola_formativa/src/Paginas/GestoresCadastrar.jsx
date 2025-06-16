import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import estilos from './Cadastrar.module.css'
import { useNavigate } from 'react-router-dom';

const dateRegex = /^\d{4}-\d{2}-\d{2}$/;

const schemaGestor = z.object({
    username: z.string()
        .min(1, 'Informe o nome de usuário')
        .max(150, 'Máximo de 150 caracteres'),

    first_name: z.string()
        .min(1, 'Informe o primeiro nome')
        .max(150, 'Máximo de 150 caracteres'),

    last_name: z.string()
        .min(1, 'Informe o sobrenome')
        .max(150, 'Máximo de 150 caracteres'),

    email: z.string()
        .email('Email inválido'),

    password: z.string()
        .min(8, 'A senha deve ter no mínimo 8 caracteres'),

    tipo: z.enum(['G', 'P'], {
        required_error: 'Informe o tipo de usuário',
        invalid_type_error: 'Tipo inválido',
    }),

    ni: z.number({
        required_error: 'Informe o NI',
        invalid_type_error: 'NI deve ser um número'
    })
    .int('NI deve ser um número inteiro'),

    telefone: z.string()
        .min(8, 'Informe um telefone válido')
        .max(20, 'Máximo de 20 caracteres')
        .nullable()
        .optional(),

    data_nascimento: z.string()
        .regex(dateRegex, 'Data de nascimento deve estar no formato YYYY-MM-DD'),

    data_contratacao: z.string()
        .regex(dateRegex, 'Data de contratação deve estar no formato YYYY-MM-DD'),
});

export function GestoresCadastrar(){
    
    const navigate = useNavigate();

    const{
        register,
        handleSubmit,
        formState: {errors},
        reset
    } = useForm({
        resolver: zodResolver(schemaGestor)
    });


    async function obterDadosFormulario(data) {
        console.log("dados do formulário ", data);

        try{
            const token = localStorage.getItem('access_token');
            const response = await axios.post(
                'http://127.0.0.1:8000/api/usuario/',
                data,
                {
                    headers:{
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                }
            );
            console.log('Gestor cadastrado com sucesso!', response.data);
            alert('Gestor cadastrado com sucesso!');
            reset();
            navigate('/inicial/gestor');
       
        } catch (error) {
            console.error('Erro ao cadastrar gestor', error);
            console.log('Resposta do backend:', error.response?.data);
            alert("Erro ao cadastrar gestor");
        }
    }
       
    return (
        <div className={estilos.container}>
            
            <form className={estilos.loginForm} onSubmit={handleSubmit(obterDadosFormulario)}>
                
                <h2 className={estilos.titulo}>Cadastro de Gestor</h2>

                <label className ={estilos.nomeCampo}>Primeiro nome:</label>
                <input
                    className={estilos.inputField}
                    {...register('first_name')}
                    placeholder="Primeiro nome"
                />
                {errors.first_name && 
                <p className={estilos.error}>
                    {errors.first_name.message}
                </p>}

                <label className ={estilos.nomeCampo}>Último nome:</label>
                <input
                    className={estilos.inputField}
                    {...register('last_name')}
                    placeholder="Último nome"
                />
                {errors.last_name && 
                <p className={estilos.error}>
                    {errors.last_name.message}
                </p>}

                
                <label className={estilos.nomeCampo}>Nome de usuário:</label>
                <input
                    className={estilos.inputField}
                    {...register('username')}
                    placeholder="Nome de usuário"
                />
                {errors.username && <p className={estilos.error}>{errors.username.message}</p>}

                <label className={estilos.nomeCampo}>Email:</label>
                <input
                    className={estilos.inputField}
                    type="email"
                    {...register('email')}
                    placeholder="Email"
                />
                {errors.email && <p className={estilos.error}>{errors.email.message}</p>}

                <label className={estilos.nomeCampo}>Senha:</label>
                <input
                    className={estilos.inputField}
                    type="password"
                    {...register('password')}
                    placeholder="Senha"
                />
                {errors.password && <p className={estilos.error}>{errors.password.message}</p>}

                <input
                    type="hidden"
                    value="G"
                    {...register('tipo')}
                />

                <label className={estilos.nomeCampo}>NI:</label>
                <input
                    className={estilos.inputField}
                    type="number"
                    {...register('ni', { valueAsNumber: true })}
                    placeholder="Número de Identificação"
                />
                {errors.ni && <p className={estilos.error}>{errors.ni.message}</p>}

                <label className={estilos.nomeCampo}>Telefone:</label>
                <input
                    className={estilos.inputField}
                    {...register('telefone')}
                    placeholder="Telefone"
                />
                {errors.telefone && <p className={estilos.error}>{errors.telefone.message}</p>}

                <label className={estilos.nomeCampo}>Data de nascimento:</label>
                <input
                    className={estilos.inputField}
                    type="date"
                    {...register('data_nascimento')}
                />
                {errors.data_nascimento && <p className={estilos.error}>{errors.data_nascimento.message}</p>}

                <label className={estilos.nomeCampo}>Data de contratação:</label>
                <input
                    className={estilos.inputField}
                    type="date"
                    {...register('data_contratacao')}
                />
                {errors.data_contratacao && <p className={estilos.error}>{errors.data_contratacao.message}</p>}
                

                <div className={estilos.icones}>
                    <button className={estilos.submitButton} type="submit">
                        Cadastrar
                    </button>
                </div>
            </form>
        </div>
    );
}