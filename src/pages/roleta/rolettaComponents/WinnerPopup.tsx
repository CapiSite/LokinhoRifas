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

  const [imgSrc, setImgSrc] = useState<string | StaticImageData>(defaultGunPic);
  const [userImgSrc, setUserImgSrc] = useState<string | StaticImageData>(defaultUserPic);

  useEffect(() => {
    if(!rewards[0]) return
    const checkImageExists = async (url: string) => {
      try {
        const response = await fetch(url, { method: "HEAD" });
        if (response.ok) {
          setImgSrc(rewards[0].itemImageUrl);
        } else {
          setImgSrc(defaultGunPic);
        }
      } catch (error) {
        setImgSrc(defaultGunPic);
      }
    };

    if (rewards[0].itemImageUrl && !rewards[0].itemImageUrl.includes('default')) {
      checkImageExists(rewards[0].itemImageUrl);
    } else {
      setImgSrc(defaultGunPic);
    }
  }, [winnerProperties.id]);

  useEffect(() => {
    if(!winnerProperties) return
    const checkImageExists = async (url: string) => {
      try {
        const response = await fetch(url, { method: "HEAD" });
        if (response.ok) {
          setUserImgSrc(winnerProperties.user.picture);
        } else {
          setUserImgSrc(defaultUserPic);
        }
      } catch (error) {
        setUserImgSrc(defaultUserPic);
      }
    };

    if (winnerProperties.user.picture && !winnerProperties.user.picture.includes('default')) {
      checkImageExists(winnerProperties.user.picture);
    } else {
      setImgSrc(defaultGunPic);
    }
  }, [winnerProperties.id]);

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
            src={imgSrc}
            alt={`Imagem de ${rewards[0].itemName}`}
            onError={(e) => {
              e.preventDefault();
              setImgSrc(defaultGunPic);
            }}
          />}
          <Image src={shine} alt="Brilho de fundo" />
        </div>
        <h2>Parabéns!</h2>
        <div className={style.UserSkinImageBox}>
            <Image src={userImgSrc} alt="Foto de usuário"/>
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
