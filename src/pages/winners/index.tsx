import style from "./styles/winners.module.css";
import Image from "next/image";
import Background from "@/images/background.png";
import { useEffect, useState } from "react";
import axios from "axios";

const Winner = () => {
  const [winners, setWinners] = useState([]);
  const [page, setPage] = useState(1); 

  useEffect(() => {
    axios
      .get(process.env.NEXT_PUBLIC_REACT_NEXT_APP + "/users/winners", {
        params: { page: page },
      })
      .then(res => {
        setWinners(res.data);
      })
      .catch(err => {
        console.error(err.response ? err.response.data : 'Erro ao buscar dados');
      });
  }, [page]); 

  const handlePreviousClick = () => {
    setPage(prev => Math.max(prev - 1, 1)); // Evita ir para página 0
  };

  const handleNextClick = () => {
    setPage(prev => prev + 1);
  };

  return (
    <div className={style.Conteudo}>
      <Image src={Background} alt="" className={style.Background} />
      <p className={style.AvisoGanhadores}>Últimos Ganhadores</p>
      <div className={style.Ganhadores}>
        <p className={style.IndiceEven}>Id</p>
        <p>Usuário</p>
        <p>Skin</p>
        <p>Prêmio</p>
      </div>
      {winners.map((o: any, index: any) => (
        <div key={index} className={style.Ganhadores}>
          <p className={index % 2 === 0 ? style.IndiceOdd : style.IndiceEven}>{index + 1}</p>
          <p>{o.name}</p>
            <p>{o.skin}</p>
            <p>{o.tradeUrl}</p>
        </div>
      ))}
      <div className={style.pagination}>
        <button onClick={handlePreviousClick} className={style.next}>Anterior</button>
        <button onClick={handleNextClick} className={style.next}>Próximo</button>
      </div>
    </div>
  );
};

export default Winner;
