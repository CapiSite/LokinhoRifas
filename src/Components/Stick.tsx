import style from "@/styles/Stick.module.css";
import Image from "next/image";
import element from "@/../public/element.png";
import Link from "next/link";

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

            <button>
              <Link href="https://api.whatsapp.com/send?phone=5586981088012&text=Ol%C3%A1%20tudo%20bem?%20Estou%20entrando%20em%20contato%20atrav%C3%A9s%20do%20site%20e%20tenho%20interesse%20nas%20rifas/skins!" target="_blank">PARTICIPAR
              </Link>
              </button>

          </div>
        </div>
        <div className={style.line}/>

      </div>
    </>
  );
}
