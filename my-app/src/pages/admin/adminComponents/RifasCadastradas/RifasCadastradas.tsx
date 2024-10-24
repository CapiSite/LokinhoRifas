import { useEffect, useState } from "react";
import axios from "axios";
import style from "./RifasCadastradas.module.css";
import CardRifas from "./CardRifas";

export default function RifasCadastradas() {
    const [rifascadastradas, setRifasCadastradas] = useState([]); 
    const [loading, setLoading] = useState(true); 
    const [error, setError] = useState(null); 
    const [pageRaffle, setPageRaffle] = useState(1); 
    const [hasMoreRaffles, setHasMoreRaffles] = useState(true); 

    // Função para carregar as rifas de uma página específica
    const loadRaffles = (page: number) => {
        setLoading(true);
        axios
            .get(process.env.NEXT_PUBLIC_REACT_NEXT_APP + `/raffle/allRaffle?page=${page}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            .then((res: any) => {
                setRifasCadastradas(res.data);

                // Verifica se a quantidade de rifas recebidas é menor que 10 itens
                if (res.data.length < 10) {
                    setHasMoreRaffles(false); // Desabilita o botão "Próxima" se houver menos de 10 rifas
                } else {
                    setHasMoreRaffles(true); // Habilita o botão "Próxima" se houver rifas suficientes
                }
            })
            .catch((err) => {
                setError(err.response?.data);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    // Carrega rifas sempre que a página for alterada
    useEffect(() => {
        loadRaffles(pageRaffle);
    }, [pageRaffle]);

    if (loading) {
        return <div>Carregando...</div>;
    }

    if (error) {
        return <div>Erro: {error}</div>;
    }

    return (
        <div className={style.ContainerRifasCadastradas}>
            {/* Exibe as rifas */}
            {rifascadastradas.map((rifa: any) => (
                <CardRifas key={rifa.id} rifa={rifa} />
            ))}

            {/* Botões de paginação */}
            <div className={style.PaginationButtons}>
                <button
                    onClick={() => setPageRaffle((prev) => Math.max(prev - 1, 1))} 
                    disabled={pageRaffle === 1} 
                >
                    Anterior
                </button>

                <button
                    onClick={() => setPageRaffle((prev) => prev + 1)}
                    disabled={!hasMoreRaffles} 
                >
                    Próxima
                </button>
            </div>
        </div>
    );
}
