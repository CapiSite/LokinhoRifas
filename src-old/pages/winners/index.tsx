import style from "./styles/winners.module.css";
import Image from "next/image";
import Background from "@/images/background.png";
import { useEffect, useState } from "react";
import axios from "axios";

const Winner = () => {
  const [winners, setWinners] = useState([]);
  const [page, setPage] = useState(1);
  const [isNextDisabled, setIsNextDisabled] = useState(false);

  useEffect(() => {
    axios
      .get(process.env.NEXT_PUBLIC_REACT_NEXT_APP + "/users/winners", {
        params: { page: page },
      })
      .then(res => {
        if (res.data.length > 0) {
          console.log(res.data);
          setWinners(res.data);
          setIsNextDisabled(false); // Ativa o botão se houver dados
        } else {
          setIsNextDisabled(true); // Desativa o botão se não houver mais dados
        }
      })
      .catch(err => {
        console.error(err.response ? err.response.data : 'Erro ao buscar dados');
        setIsNextDisabled(true); // Desativa o botão em caso de erro
      });
  }, [page]);

  const handlePreviousClick = () => {
    setPage(prev => Math.max(prev - 1, 1)); // Evita ir para página 0
  };

  const handleNextClick = () => {
    if (!isNextDisabled) {
      axios
        .get(process.env.NEXT_PUBLIC_REACT_NEXT_APP + "/users/winners", {
          params: { page: page + 1 },
        })
        .then(res => {
          if (res.data.length > 0) {
            setPage(prev => prev + 1); // Só avança se houver dados na próxima página
            setWinners(res.data);
          }
          // Não precisa alterar o estado de 'page' ou 'winners' se não houver dados
        })
        .catch(err => {
          console.error(err.response ? err.response.data : 'Erro ao buscar dados');
        });
    }
  };

  return (
    <div className={style.Conteudo}>
      <Image src={Background} alt="" className={style.Background} />
      <p className={style.AvisoGanhadores}>Últimos Ganhadores</p>
      <div className={style.Ganhadores}>
        <p className={style.IndiceEven}>Id</p>
        <p className={style.user}>Usuário</p>
        <p>Skin</p>
        <p>Prêmio</p>
      </div>
      {winners.map((o :any, index :any) => (
        <div key={index} className={style.Ganhadores}>
          <p className={index % 2 === 0 ? style.IndiceOdd : style.IndiceEven}>{index + 1}</p>
          <p>{o.winner.name}</p>
          <p>{o.skin}</p>
          <p>{o.tradeUrl}</p>
        </div>
      ))}
      <div className={style.pagination}>
        <button onClick={handlePreviousClick} className={style.previous}>Anterior</button>
        <button onClick={handleNextClick} disabled={isNextDisabled} className={style.next}>Próximo</button>
      </div>
    </div>
  );
};

export default Winner;