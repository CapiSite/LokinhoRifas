import style from "../roletta.module.css";
import cn from "classnames";

import GOLDIcon from "../../../assets/GOLD.svg";
import SILVERIcon from "../../../assets/SILVER.svg";
//! ATENÇÃO TODAS AS IMAGENS DAS ARMAS DEVEM ESTAR NA SEGUINTE RESOLUÇÃO: 165x135!
import defaultGunPic from "../../../images/Roleta/Prizes/DefaultGunPic.png";
//! ATENÇÃO TODAS AS IMAGENS DAS ARMAS DEVEM ESTAR NA SEGUINTE RESOLUÇÃO: 165x135!

import Image, { StaticImageData } from "next/image";
import { LastEarnFrontEndType } from "utils/interfaces";
import { useEffect, useState } from "react";

const LastEarnedPrizes = ({
  props,
}: {
  props: { item: LastEarnFrontEndType; index: number };
}) => {
  if (!props) {
    return <div>Error: No props provided</div>;
  }

  const {
    itemImageUrl,
    TimeOfEarning = "há pouco",
    ChanceOfEarning = "0%",
    PoolType = "Silver",
    ItemName = "Item Desconhecido",
    ItemType = "Tipo Desconhecido",
    ItemValue = "0.00",
    WinnerNumber = 0,
    WinnerPicture = "Sem foto",
    WinnerName = "Sem nome",
  } = props.item;

  const [imgSrc, setImgSrc] = useState<string | StaticImageData>(defaultGunPic);
  const [winnerPic, setWinnerPic] = useState<string | StaticImageData>(defaultGunPic);

  useEffect(() => {
    // Função para verificar e atualizar a imagem do item
    const checkImageExists = async (url: string) => {
      try {
        const response = await fetch(url, { method: "HEAD" });
        if (response.ok) {
          setImgSrc(url);
        }
      } catch (error) {
        setImgSrc(defaultGunPic);
      }
    };

    if (itemImageUrl && !itemImageUrl.includes("default")) {
      checkImageExists(itemImageUrl);
    }
  }, [itemImageUrl]);

  useEffect(() => {
    // Atualizando a imagem do ganhador de acordo com as condições
    if (typeof WinnerPicture === "string" && WinnerPicture.includes("https://static-cdn.jtvnw.net")) {
      setWinnerPic(WinnerPicture); // Se a imagem for da Twitch, use-a diretamente
    } else if (typeof WinnerPicture === "string" && !WinnerPicture.includes("default")) {
      setWinnerPic(`${process.env.NEXT_PUBLIC_REACT_NEXT_APP}/uploads/${WinnerPicture}`); // Adiciona a rota do backend para imagens locais
    } else {
      setWinnerPic(defaultGunPic); // Usa a imagem padrão
    }
  }, [WinnerPicture]);
  

  return (
    <div
      className={cn(
        props.index > 2 && style.desktop,
        style.EarnedPrizeItem,
        style?.[PoolType]
      )}
    >
      <div className={style.EarnedPrizeItemWrapper}>
        <div className={style.ItemMetaInfo}>
          <p>
            Foi sorteado há
            <br />
            {TimeOfEarning}
          </p>
          <p>
            Chance
            <br />
            {ChanceOfEarning}
          </p>
        </div>
        <div className={style.ImageWrapperBox}>
          <Image
            width={165}
            height={135}
            src={imgSrc}
            alt={`Imagem de ${ItemName}`}
            onError={(e) => {
              e.preventDefault();
              setImgSrc(defaultGunPic);
            }}
          />
        </div>
        <div className={style.ItemDescription}>
          <div className={style.PrizePoolType}>
            <Image
              height={50}
              width={30}
              src={PoolType === "Gold" ? GOLDIcon : SILVERIcon}
              alt={`Ícone da Rifa ${PoolType === "Gold" ? "Gold" : "Silver"}`}
            />
            <h3>RIFA {PoolType}</h3>
          </div>
          <div className={style.ItemContent}>
            <h2>{ItemName}</h2>
            <p>{ItemType}</p>
          </div>
          <div className={style.ItemValue}>
            <h3>R$ {Number(ItemValue).toFixed(2)}</h3>
          </div>
        </div>
      </div>
      <div className={style.WinnerInfo}>
        <div className={style.WinnerDetails}>
          <Image
            width={50}
            height={50}
            src={winnerPic}
            alt={`Foto do ganhador ${WinnerName}`}
            onError={() => {
              setWinnerPic(defaultGunPic); // Em caso de erro, exibe a imagem padrão
            }}
            className={style.WinnerPicture}
          />
          <p className={style.WinnerText}>
            {`#${WinnerNumber}`} <br />
          </p>
        </div>
      </div>
    </div>
  );
};

export default LastEarnedPrizes;
