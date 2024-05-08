import style from "../styles/Stick.module.css";
import Image from "next/image";
import element from "../images/element.png";
import Link from "next/link";
import VanillaTilt from "vanilla-tilt";
import { useEffect, useRef } from "react";

export default function Stick() {
  const options = {
    scale: 1,
    speed: 1000,
    max: 25
  };
  const tilt:any = useRef(null);
  useEffect(() => {
    VanillaTilt.init(tilt.current, options);
  }, [options]);
  return (
    <>
        <div className={style.background}>
          <div className={style.left}>
            <Image data-tilt-full-page-listening ref={tilt} width={550} alt="Element" src={element} />
          </div>
          <div className={style.right}>
            <h1><span>TRANSFORME</span> SEU INVENTÁRIO COM O <span>LOKINHO</span></h1>
            <p>Fazemos upgrade, compra e venda. Precisa de uma skin específica? Também fazemos encomendas!</p>

            <button>
              <Link href="https://api.whatsapp.com/send?phone=5586981088012&text=Ol%C3%A1%20tudo%20bem?%20Estou%20entrando%20em%20contato%20atrav%C3%A9s%20do%20site%20e%20tenho%20interesse%20de%20compra/venda/upgrade%20de%20skins!" target="_blank">FAÇA SEU ORÇAMENTO
              </Link>
              </button>
              
          </div>
        </div>
        
    </>
  );
}