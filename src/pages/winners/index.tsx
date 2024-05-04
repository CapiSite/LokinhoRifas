import style from "./styles/winners.module.css";
import Image from "next/image";
import Background from "@/images/background.png";
import { useEffect, useState } from "react";
import axios from "axios";

const Winner = () => {
  const [winners, setWinners] = useState<any>([]);
  const [page, setPage] = useState(2);

  useEffect(() => {
    axios
      .get(process.env.NEXT_PUBLIC_REACT_NEXT_APP + "/users/winners", {
        params: { page: page },
      })
      .then((res: any) => {
        setWinners(res.data);
        console.log(res.data);
      })
      .catch((err: any) => {
        console.log(err.response.data);
      });
  }, []);

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
      {winners.map((o: any, index: any) => {
        const estiloIndice =
          index % 2 === 0 ? style.IndiceOdd : style.IndiceEven;
        return (
          <div key={index} className={style.Ganhadores}>
            <p className={estiloIndice}>{index}</p>
            <p>{o.name}</p>
            <p>{o.skin}</p>
            <p>{o.tradeUrl}</p>
          </div>
        );
      })}
    </div>
  );
};
export default Winner;
