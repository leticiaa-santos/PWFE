import axios from 'axios';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import estilo from './Login.module.css';

const schemaLogin = z.object({
    username: z.string()
        .min(1, 'Informe o seu usuário')
        .max(30, 'Informe no máximo 30 caracteres'),
    
    password: z.string()
        .min(1, 'Informe ao menos um caractere')
        .max(15, 'Informe no máximo 15 caracteres')
});

export function Login(){
    //registra todas as informações que são dadas pelo usuário e tenta resolver de acordo com o esquema
    const{
        register,
        handleSubmit,
        formState: {errors}
    }=useForm(
        {resolver: zodResolver(schemaLogin)}
    );
    async function ObterDados(data) {
        console.log(`Dados ${data}`)

        try{
            const response = await axios.post('http://127.0.0.1:8000/api/login', {
                username: data.username,
                password: data.password

            });
            const { access, refresh, user } = response.data;

            localStorage.setItem('access_token', access)
            localStorage.setItem('refresh_token', refresh)
            localStorage.setItem('tipo', user.tipo)
            localStorage.setItem('username', username)

            console.log("Login efetuado com sucesso")
        }catch(error){
            console.error('Deu ruim', error)
            alert("Dados inválidos")
        }
    }

    return(
        <div className={estilo.container}>

            <form onSubmit={handleSubmit(ObterDados)} className={estilo.loginForm}>

                <h2 className={estilo.titulo}>Login</h2>

                <label className={estilo.label}>Usuário:</label>

                <input
                    {...register('username')}
                    placeholder='josesilva'
                    className={estilo.inputField}
                />
                {errors.username && <p>{errors.username.message}</p>}


                <label className={estilo.label}>Senha:</label>

                <input
                    {...register('password')}
                    placeholder='senha'
                    type="password"
                    className={estilo.inputField}
                />
                {errors.password && <p className={estilo.error}>{errors.password.message}</p>}

                <button type="submit" className={estilo.submitButton}>Entrar</button>

            </form>
        </div>
    )
}