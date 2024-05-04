import React, { useEffect } from "react";
import style from "./styles/Twitch.module.css";
import Image from "next/image";
import Background from "@/images/background.png";
import Post from "@/images/Post.png";
import logovermelho from "@/images/logovermelho.png";
import { TwitchEmbed, TwitchPlayer } from "react-twitch-embed";

const Twitch = () => {
  return (
    <div className={style.container}>
      <Image
        src={Background}
        alt="Papel de Parede do site"
        className={style.wallpaper}
      />
      <main className={style.conteudo}>
        <Image
          src={logovermelho}
          alt="Logo do Site - LokinhoRifas"
          className={style.LogoTwitch}
        />
        <h1 className={style.tituloLive}>RIFA IRÁ COMEÇAR AS XX:XX</h1>
        <div className={style.video}>
          <TwitchEmbed channel="Gaules"/>
          {/* <TwitchPlayer channel="Gaules" />  */}
          </div>
      </main>
    </div>
  );
};

export default Twitch;
