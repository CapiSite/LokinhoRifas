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
  } = props.item;

  const [imgSrc, setImgSrc] = useState<string | StaticImageData>(defaultGunPic);

  useEffect(() => {
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

    if (itemImageUrl && !itemImageUrl.includes('default')) {
      checkImageExists(itemImageUrl);
    }
  }, [itemImageUrl]);

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
            <h3>R$ {ItemValue}.00</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LastEarnedPrizes;
