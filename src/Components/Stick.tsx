import style from "@/styles/Stick.module.css";
import Image from "next/image";
import element from "@/../public/element.png";

export default function Stick() {
  return (
    <>
      <div className={style.forLine}>
        <div className={style.line}/>
        <div className={style.background}>
          <div className={style.left}>
            <Image width={550} alt="Element" src={element} />
          </div>
          <div className={style.right}>
            <h1><span>TRANSFORME</span> SEU INVENTÁRIO COM O <span>MELHOR</span></h1>
            <p>Junte-se a nós agora mesmo e tenha a oportunidade de adquirir as skins mais desejadas. Não deixe para depois!</p>
            <button>PARTICIPAR</button>
          </div>
        </div>
        <div className={style.line}/>

      </div>
    </>
  );
}
