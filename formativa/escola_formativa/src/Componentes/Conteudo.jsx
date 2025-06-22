import estilo from './Conteudo.module.css';
import banner from '../assets/banner.png';
import professor from '../assets/professor.png';
import sala from '../assets/sala.png';
import disciplina from '../assets/disciplina.png';
import ambiente from '../assets/ambiente.png';

export function Conteudo() {
  return (
    <>
      <div className={estilo.containerBanner}>
        <img src={banner} alt="" />
      </div>

      <div className={estilo.container}>
        <section className={estilo.sobre}>
          <h2>Sobre o Sistema</h2>
          <p>
            Esta plataforma foi criada para facilitar a gestão de salas, disciplinas e reservas em um ambiente escolar. 
            Oferece praticidade para professores e controle eficiente para gestores.
          </p>
        </section>

        <section className={estilo.historia}>
          <h2>Nossa História</h2>
          <p>
            O sistema nasceu como parte de um projeto técnico, com o objetivo de digitalizar processos acadêmicos e 
            promover a organização escolar por meio da tecnologia.
          </p>
        </section>

        <section className={estilo.objetivos}>
          <h2>Objetivos</h2>
          <ul>
            <li>✔ Digitalizar o processo de reservas de ambientes</li>
            <li>✔ Organizar dados de salas, professores e disciplinas</li>
            <li>✔ Otimizar o tempo da equipe pedagógica</li>
          </ul>
        </section>

        <section className={estilo.funcionalidades}>
          <h2>Funcionalidades</h2>
          <div className={estilo.cards}>
            <div className={estilo.card}>
              <img src={professor} alt="" className={estilo.icone}/>
              <p>Cadastro de Professores</p>
            </div>
            <div className={estilo.card}>
              <img src={sala} alt="" className={estilo.icone}/>
              <p>Gerenciamento de Salas</p>
            </div>
            <div className={estilo.card}>
              <img src={disciplina} alt="" className={estilo.icone}/>
              <p>Controle de Disciplinas</p>
            </div>
            <div className={estilo.card}>
              <img src={ambiente} alt="" className={estilo.icone}/>
              <p>Reservas de Ambientes</p>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
