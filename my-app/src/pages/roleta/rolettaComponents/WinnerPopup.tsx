import style from "../roletta.module.css";
import Image, { StaticImageData } from "next/image";

import defaultGunPic from "../../../images/Roleta/Prizes/DefaultGunPic.png";
import defaultUserPic from "../../../assets/defaultProfilePic2.svg"
import shine from "../../../images/Roleta/WinnerPopup/shine.png";

import { RouletteContext } from "utils/interfaces";
import { useEffect, useState } from "react";
import { useRouletteContext } from "contexts/RouletteContext";

const RoletaWinner = () => {
  const {
    rewards = [],
    winnerPopupVisible,
    manageCloseResult,
    isMockWin,
    winnerProperties = {
      number: 0,
      id: 0,
      user: {
          id: 0,
          name: '',
          picture: '',
      }
    },
  } = useRouletteContext() as RouletteContext;

  const [imgSrc, setImgSrc] = useState<string | StaticImageData>();
  const [userImgSrc, setUserImgSrc] = useState<string | StaticImageData>();

  useEffect(() => {
    const debounce = setTimeout(() => {
      if(!rewards) return
      if(rewards.length === 0) return
      
      if(!(rewards[0].itemImageUrl.includes('default'))) {
        setImgSrc(rewards[0].itemImageUrl)
      }
      else {
        if(imgSrc == defaultGunPic) return
        setImgSrc(defaultGunPic)
      }
    }, 800);

    return () => {
      clearTimeout(debounce)
    }
  }, [winnerProperties])
  
  useEffect(() => {
    const debounce = setTimeout(() => {
      if(!winnerProperties) return
      console.log(winnerProperties.user.picture)
      if(winnerProperties.user.picture.includes('https://static-cdn.jtvnw.net')) {
        setUserImgSrc(winnerProperties.user.picture)
      } else if(!(winnerProperties.user.picture.includes('default'))) {
        setUserImgSrc(winnerProperties.user.picture)
      } else {
        if(userImgSrc == defaultUserPic) return

        setUserImgSrc(defaultUserPic)
      }
    }, 800);

    return () => {
      clearTimeout(debounce)
    }
  }, [winnerProperties])

  return (
    <div
      className={style.WinnerPopup}
      style={{ display: `${winnerPopupVisible ? "flex" : "none"}` }}
    >
      <div className={style.WinnerPopupWrapper}>
        <div className={style.SkinImageBox}>
          {rewards[0] && <Image
            width={775}
            height={637}
            src={imgSrc || defaultGunPic}
            alt={`Imagem de ${rewards[0].itemName}`}
            onError={(e) => {
              e.preventDefault();
              setImgSrc(defaultGunPic);
            }}
          />}
          <Image height={775} width={637} src={shine} alt="Brilho de fundo" />
        </div>
        <h2>Parabéns!</h2>
        <div className={style.UserSkinImageBox}>
            <Image height={50} width={50} src={typeof userImgSrc === 'string' // Verifica se userImgSrc é uma string
      ? userImgSrc.startsWith('http') // Se for string, verifica se começa com http
        ? userImgSrc // Mantém a URL como está
        : `${process.env.NEXT_PUBLIC_REACT_NEXT_APP}/uploads/${userImgSrc}` // Adiciona o caminho do backend
      : defaultUserPic // Exibe a imagem padrão se não houver userImgSrc ou se for StaticImageData
      } alt="Foto de usuário"/>
        </div>
        {winnerProperties && <h3 className={style.userNickname}>@{winnerProperties.user.name + '#' + winnerProperties.number}</h3>}
        {rewards[0] && <p>Ganhador da {rewards[0].itemName}</p>}

        <button onClick={() => manageCloseResult(isMockWin)}>
          Próximo Sorteio
        </button>
      </div>

      <div className={style.glowGroup}>
        <div className={style?.["glow-0"]}>
          <div className={style?.["glow-1"]}></div>
        </div>
      </div>
    </div>
  );
};

export default RoletaWinner;
