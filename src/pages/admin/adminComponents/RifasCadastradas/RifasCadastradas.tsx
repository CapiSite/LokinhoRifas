import { useEffect, useState } from "react";
import axios from "axios";
import style from "./RifasCadastradas.module.css";
import CardRifas from "./CardRifas";

export default function RifasCadastradas() {
    const [rifascadastradas, setRifasCadastradas] = useState([]);
    const [loading, setLoading] = useState(true); // Para indicar o status de carregamento
    const [error, setError] = useState(null); // Para capturar erros
    const [pageRaffle, setPageRaffle] = useState(1);

    useEffect(() => {
        axios.get(process.env.NEXT_PUBLIC_REACT_NEXT_APP + `/raffle/allRaffle?page=${pageRaffle}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        } )
        .then((res:any) => {
            setRifasCadastradas(res.data);
        })
        .catch((err) => {
            setError(err.response.data);
        })
        .finally(() => {
            setLoading(false);
        });
    }, [rifascadastradas]);

 

    if (loading) {
        return <div>Carregando...</div>;
    }

    if (error) {
        return <div>Erro: {error}</div>;
    }

    return(
        <div className={style.ContainerRifasCadastradas}>
        {rifascadastradas.map((rifa:any) =>
            <CardRifas key={rifa.id} rifa={rifa} />
        )}
        </div>
    );
}