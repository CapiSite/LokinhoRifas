import style from "./styles/winners.module.css";
import Image from "next/image";
import Background from '@/images/background.png'
const Winer = () => {
  const array = [
    { name: "hugo", skin: "dragonLore", photo: "hugo", email: "luizdacuzinho", tradeUrl: "teste" },
    { name: "hugo", skin: "dragonLore", photo: "hugo", email: "luizdacuzinho", tradeUrl: "teste" },
    { name: "hugo", skin: "dragonLore", photo: "hugo", email: "luizdacuzinho", tradeUrl: "teste" },
    { name: "hugo", skin: "dragonLore", photo: "hugo", email: "luizdacuzinho", tradeUrl: "teste" },
    { name: "hugo", skin: "dragonLore", photo: "hugo", email: "luizdacuzinho", tradeUrl: "teste" },
    { name: "hugo", skin: "dragonLore", photo: "hugo", email: "luizdacuzinho", tradeUrl: "teste" },
    { name: "hugo", skin: "dragonLore", photo: "hugo", email: "luizdacuzinho", tradeUrl: "teste" },
    { name: "hugo", skin: "dragonLore", photo: "hugo", email: "luizdacuzinho", tradeUrl: "teste" },
    { name: "hugo", skin: "dragonLore", photo: "hugo", email: "luizdacuzinho", tradeUrl: "teste" },
    { name: "hugo", skin: "dragonLore", photo: "hugo", email: "luizdacuzinho", tradeUrl: "teste" },
    { name: "hugo", skin: "dragonLore", photo: "hugo", email: "luizdacuzinho", tradeUrl: "teste" },
    { name: "hugo", skin: "dragonLore", photo: "hugo", email: "luizdacuzinho", tradeUrl: "teste" },
    { name: "hugo", skin: "dragonLore", photo: "hugo", email: "luizdacuzinho", tradeUrl: "teste" },
    { name: "hugo", skin: "dragonLore", photo: "hugo", email: "luizdacuzinho", tradeUrl: "teste" }
  ]
  return (
    <div className={style.Conteudo}>
      <Image src={Background} alt="" className={style.Background} />
      <p className={style.AvisoGanhadores}>Últimos Ganhadores</p>
      <div className={style.Campos}>
        <p></p>
        <p>Usuário</p>
        <p>Skin</p>
        <p>Prêmio</p>
      </div>
      {array.map((o, index) => {
        const estiloIndice = index % 2 === 0 ? style.IndiceOdd : style.IndiceEven;

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
export default Winer;