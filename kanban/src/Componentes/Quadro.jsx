import React, { useState, useEffect } from "react";
import axios from "axios";
import { Coluna } from "./Coluna";
import { DndContext } from "@dnd-kit/core"; // é o uso da biblioteca de clicar e arrastar 

export function Quadro () {
    const [tarefas, setTarefas] = useState([]);

    // o Effect é um hook que permite a renderização de alguma coisa na tela
    useEffect (() => {

        //construo uma variável com o endereço da API
        const apiURL = 'http://127.0.0.1:8000/api/tarefa/';

        //permite a chamada do endereço
        axios.get(apiURL)

            //se a resposta for positiva
            .then(response => {setTarefas(response.data)
            })

            //se der algum problema
            .catch(error => {
                console.error("Algo seu errado", error)
            });
    }, [])



    //armazenando em variáveis o resultado de uma função callback que procura tarefas com um certo status
    const tarefasAfazer = tarefas.filter(tarefa => tarefa.status === 'a fazer');
    const tarefasFazendo = tarefas.filter(tarefa => tarefa.status === 'fazendo');
    const tarefasFeito = tarefas.filter(tarefa => tarefa.status === 'feito');

    return (
        <>

            <h1>Meu Quadro</h1>

            <main className="container">
                <section className="atividades">
                    <Coluna titulo = "A fazer" tarefas={tarefasAfazer}/>
                    <Coluna titulo = "Fazendo" tarefas={tarefasFazendo}/>
                    <Coluna titulo = "Feito" tarefas={tarefasFeito}/>
                </section>
                
            </main>

        </>
        
        
    );

}