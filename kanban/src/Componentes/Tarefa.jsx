export function Tarefa ({ tarefa }) {
    
    return(
        <article>
            <h3 id={`tarefa: ${Tarefa.id}`}>{tarefa.descricao}</h3>
            <dl>
                <dt>Setor: </dt>
                <dd>{tarefa.setor}</dd>

                <dt>Prioridade: </dt>
                <dd>{tarefa.prioridade}</dd>
            </dl>
            <button>Editar</button>
            <button>Excluir</button>

            <form>
                <label>Status:</label>
                <select id={tarefa.id} name="status">
                    <option value="">Selecione </option>
                    <option value="a fazer">A fazer</option>
                    <option value="fazendo">Fazendo</option>
                    <option value="feito">Feito</option>
                </select>
                <button>Alterar Status</button>
            </form>
        </article>
    );
}