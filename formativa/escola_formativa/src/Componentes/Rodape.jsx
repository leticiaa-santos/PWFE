import estilo from './Rodape.module.css';

export function Rodape(){ 
    
    {/* Breves informações para compor o rodapé do site */}
    return(
       
        <footer className={estilo.footer}>
            <div className={estilo.infoContainer}>
                <div>
                    <h4>AcadSpace</h4>
                    <p>Facilitando a gestão de disciplinas, salas e reservas.</p>
                </div>

                <div>
                    <h4>Contato</h4>
                    <p>Email: suporte@acadspace.com</p>
                    <p>Telefone: (19) 1234-5678</p>
                </div>

                <div>
                    <h4>Links úteis</h4>
                    <ul>
                        <li><a href='/inicial'>Início</a></li>
                        <li><a href='disciplina'>Disciplinas</a></li>
                        <li><a href='ambiente'>Reservas</a></li>
                    </ul>
                </div>
            </div>

            <div className={estilo.copyRight}>
                <p>&copy; {new Date().getFullYear()} AcadSpace. Todos os direitos reservados.</p>
            </div>
        </footer>
    );
}