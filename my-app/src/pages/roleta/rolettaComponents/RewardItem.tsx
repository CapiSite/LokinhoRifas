import style from "../roletta.module.css";
import cn from "classnames";

import GOLDIcon from "../../../assets/GOLD.svg";
import SILVERIcon from "../../../assets/SILVER.svg";

//! ATENÇÃO TODAS AS IMAGENS DAS ARMAS DEVEM ESTAR NA SEGUINTE RESOLUÇÃO: 165x135!
import defaultGunPic from "../../../images/Roleta/Prizes/DefaultGunPic.png";
//! ATENÇÃO TODAS AS IMAGENS DAS ARMAS DEVEM ESTAR NA SEGUINTE RESOLUÇÃO: 165x135!

import Image, { StaticImageData } from "next/image";
import { RewardItemType } from "utils/interfaces";
import { useEffect, useState } from "react";

const RewardItem = ({
  props,
}: {
  props: { item: RewardItemType; index: number };
}) => {
  if (!props) {
    return <div>Error: No props provided</div>;
  }

  const { type, itemImageUrl, itemName, itemType, itemValue } = props.item;

  const [imgSrc, setImgSrc] = useState<string | StaticImageData>(itemImageUrl);

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
        props.index > 0 && style.desktop,
        style.Reward,
        style?.[type]
      )}
    >
      <div className={style.RewardItemWrapper}>
        <div className={style.RewardType}>
          <Image
            priority={false}
            src={type == "Gold" ? GOLDIcon : SILVERIcon}
            alt={type == "Gold" ? "Icone Gold" : "Icone Silver"}
          />
          <h3>RIFA {type == "Gold" ? "GOLD" : "SILVER"}</h3>
        </div>
        <div className={style.RewardContent}>
          <Image
            src={imgSrc}
            alt={`Imagem de ${itemName}`}
            width={103}
            height={73}
            onError={(e) => {
              e.preventDefault();
              setImgSrc(defaultGunPic);
            }}
          />
          <div className={style.RewardDescription}>
            <h2>{itemName}</h2>
            <p>{itemType}</p>
          </div>
        </div>
        <div className={style.RewardValue}>
          <h3>R$ {itemValue}.00</h3>
        </div>
      </div>
    </div>
  );
};

export default RewardItem;
