import { BarraNavegacao } from "../componentes/BarraNavegacao";
import { Cabecalho } from "../componentes/Cabecalho";
import { Outlet } from "react-router-dom";
import { Rodape } from "../componentes/Rodape";

export function Inicial(){
    return(
        <>
            <Cabecalho />
            <BarraNavegacao />
            <Outlet />
            <Rodape />
        </>

    );

}