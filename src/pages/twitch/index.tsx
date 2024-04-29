import { useState } from "react";
import HomeIcon from '@mui/icons-material/Home';

import style from "./styles/Twitch.module.css"
import Image from "next/image";
import Background from "@/images/background.png";
import Post from "@/images/Post.png";
import logovermelho from "@/images/logovermelho.png";

const Twitch = () => {

  return (
    <div className={style.container}>
      <Image src={Background} alt="Papel de Parede do site" className={style.wallpaper}/>
      <menu className={style.navBar}>
        <div className={style.containerLogo}>
          <Image src={logovermelho} alt="Logo do Site - LokinhoRifas" className={style.Logo}/>
        </div>
          <nav>
            <ul className={style.ItensNavBar}>
              <li>Home</li>
              <li>Sorteio</li>
              <li>Live</li>
              <li>Últimos Ganhadores</li>
              <li>Sobre nós</li>
            </ul>
          </nav>
        <div className={style.containerBotao}>
          <button type="button" className={style.botaoEntrar}>Entrar</button>
        </div>
      </menu>
      <main className={style.conteudo}>
        <Image src={logovermelho} alt="Logo do Site - LokinhoRifas" className={style.LogoTwitch}/>
        <h1 className={style.tituloLive}>RIFA IRÁ COMEÇAR AS XX:XX</h1>
        <iframe className={style.Live} width="560" height="315" src="https://www.youtube.com/embed/8MmSc9_9ULk?si=Nb6KxOKVCDSY1VuZ" title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"></iframe>
      </main>
    </div>
  )

}

export default Twitch