import style from "../styles/winner.module.css";
import Image from 'next/image';
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
        if (res.data.length > 0) {
          console.log(res.data);
          setWinners(res.data);
        } 
      })
      .catch(err => {
        console.error(err.response ? err.response.data : 'Erro ao buscar dados');
      });
  }, [page]);

  return (
    <>
    <div className={style.Conteudo}>
      <p className={style.AvisoGanhadoress}>Últimos Ganhadores</p>
      <div className={style.Ganhadores}>
        <p  className={style.id}>Ganhadores</p>
        <p className={style.usuario}>Usuário</p>
        <p>Skin</p>
        <p>Prêmio</p>
      </div>
      {winners.slice(0,4).map((o :any, index :number) => (
        <div key={index} className={style.Ganhadores}>
          <p className={index % 2 === 0 ? style.IndiceOdd : style.IndiceEven}>{index + 1}</p>
          <p>{o.winner.name}</p>
          <p>{o.skin}</p>
          <p>{o.premio}</p>
        </div>
      ))}
    </div>
    </>
  );
};

export default Winner;
