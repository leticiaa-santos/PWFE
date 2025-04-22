import estilo from './Perfil.module.css'
import perfil from '../assets/perfil.svg'

export function Perfil(){
    return(

        <main className={estilo.conteiner}>
            <h2 className={estilo.titulo}>Meu Perfil</h2>

            <section className={estilo.sobre}>

                <div className={estilo.dados}>
                    <img className={estilo.perfil} src={perfil } alt="" />
                    <h2>Letícia Oliveira</h2>

                </div>

            </section>
        </main>
    );
}