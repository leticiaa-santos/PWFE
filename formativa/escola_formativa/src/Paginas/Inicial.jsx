import { Cabecalho } from "../Componentes/Cabecalho";
import { Rodape } from "../Componentes/Rodape";
import { Outlet } from "react-router-dom";
import estilo from "./Inicial.module.css";

export function Inicial(){
    return(
        <div className={estilo.pageContainer}>
            <Cabecalho />
            <main className={estilo.conteudo}>
                <Outlet />
            </main>
            <Rodape />
        </div>
    )
}