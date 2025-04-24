import estilo from './InfosPerfil.module.css'
import perfil from '../assets/perfil.svg'
import pll from '../assets/pll.svg'
import porTras from '../assets/tras_olhos.svg'
import arrow from '../assets/arrow.svg'
import enrolados from '../assets/enrolados.svg'
import mapa from '../assets/mapa_coisas_perfeitas.svg'
import fuja from '../assets/fuja.svg'

export function InfosPerfil (){

    return(
        <main className={estilo.conteiner}>
            <h2 className={estilo.titulo}>Meu Perfil</h2>
            <section className={estilo.infosPerfil}>

                <section className={estilo.dados}>

                    <div className={estilo.identificacao}>
                        <img className={estilo.fotoPerfil} src={ perfil } alt="" />
                        <h2>Letícia Oliveira</h2>
                    </div>

                    <div className={estilo.infosPessoais}>
                        <h4>Seus dados:</h4>
                        <p>Email: leticia.ltc2005@gmail.com</p>
                        <p>Quantidade de séries assistidas: 14</p>
                        <p>Quantidade de filmes assistidos: 67</p>

                    </div>
                </section>

                <section className={estilo.favoritos}>

                    <h2>Seus queridinhos</h2>

                    

                    <section className={estilo.filmes}>

                        <h3>Filmes</h3>

                        <section className={estilo.selecao}>

                            <div className={estilo.filme}>
                                <img src={ enrolados } alt="" />
                            </div>
                            <div className={estilo.filme}>
                                <img src={ mapa } alt="" />
                            </div>
                            <div className={estilo.filme}>
                                <img src={ fuja } alt="" />
                            </div>
                            
                        </section>
                        
                    </section>

                    <section className={estilo.series}>

                            <h3>Séries</h3>

                        <section className={estilo.selecao}>

                            <div className={estilo.serie}>
                                <img src={ pll } alt="" />
                            </div>
                            <div className={estilo.serie}>
                                <img src={ porTras } alt="" />
                            </div>
                            <div className={estilo.serie}>
                                <img src={ arrow } alt="" />
                            </div>

                        </section>

                    </section>
                </section>

            </section>
        </main>
    )
}

