import React, { useEffect, useState } from "react";
import style from "./styles/Twitch.module.css";
import Image from "next/image";
import Background from "@/images/background.png";
import logovermelho from "@/images/logovermelho.png";
import { TwitchEmbed } from "react-twitch-embed";
import ReactTwitchEmbedVideo from "react-twitch-embed-video";

const Twitch = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 950);
    };

    handleResize(); // Chama a função imediatamente para definir o estado inicial

    window.addEventListener("resize", handleResize);

    setIsLoading(false); // Marca que o carregamento foi concluído após a montagem inicial

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Renderiza a live dependendo do tamanho da tela e do estado de carregamento
  const renderLive = () => {
    if (isMobile) {
      return <div className={style.Live}>
        <ReactTwitchEmbedVideo channel="evandro_vidal" />
      </div>;
    } else {
      return <TwitchEmbed className={style.Live} channel="Gaules" />;
    }
  };

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

        {/* Renderiza a live apenas quando o carregamento estiver concluído */}
        {!isLoading && renderLive()}
        <div></div>
      </main>
    </div>
  );
};

export default Twitch;