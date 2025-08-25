import axios from 'axios';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

//Validação de formulário
const schemaCadUsuario = z.object({
    nome: z.string()
        .min(1,'Insira ao menos um caractere')
        .max(30, 'Insira até 50 caracteres'),
    email: z.string()
        .min(1, 'Insira seu E-mail')
        .max(30, 'Insira um endereço de e-mail com até 30 caracteres')
        .email("Formato de e-mail inválido")
})

export function CadUsuario () {

    return(
        <form>

            <h2>Cadastro do Usuário</h2>
            
            <label>Nome:</label>
            <input type="text" placeholder='Jose da Silva' required/>

            <label>E-mail:</label>
            <input type="email" placeholder='email@email.com' required/>

            <button type='submit'>Cadastrar</button>

        </form>
    );
}