import style from "../styles/About.module.css";
import Image from "next/image";
import Artwork from "../images/Artwork.png"
import BackgroundAbout from "../images/backgroundAbout.png"
import { useEffect, useRef } from "react";
import VanillaTilt from "vanilla-tilt";

export default function About() {
  const options = {
    scale: 1.10,
    speed: 300,
    max: 10
  }; 
  const tilt:any = useRef(null);
  useEffect(() => {
    VanillaTilt.init(tilt.current, options);
  }, [options]);
  return (
    <div className={style.forLine}>
    <Image className={style.backAbout} src={BackgroundAbout} alt="background"/>
      <div className={style.background} id="about">
        <div className={style.left}>
          <h1>QUEM <span>SOMOS</span></h1>
          <p>
          Thiago Cordeiro (Lokinho). Sou um jovem sonhador apaixonado por skins do Counter-Striker. Jogo desde 2017 e entrei no mercado de vendas em 2019, venho construindo meu negócio em vendas e rifas de skins. Agradeço por estar aqui e seja muito bem vindo.
          </p>
        </div>
        <div ref={tilt} className={style.right}>
          <Image data-tilt  alt="lokinho" src={Artwork} width={550} />
        </div>
        <div className={style.rightMobile}>
          <Image alt="lokinho" src={Artwork} width={550} />
        </div>
      </div>
    </div>
  );
}