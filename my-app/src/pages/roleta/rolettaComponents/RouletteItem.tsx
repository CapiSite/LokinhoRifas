import style from "../roletta.module.css";
import Image, { StaticImageData } from "next/image";
import { CardItemType, RouletteContext } from "utils/interfaces";
import cn from "classnames";

import defaultPicture from "../../../assets/defaultProfilePic.svg";
import { useEffect, useState } from "react";
import { useRouletteContext } from "contexts/RouletteContext";

const RouletteItem = ({ props }: { props: CardItemType }) => {
  if (!props) {
    return <div>Error: No props provided</div>;
  }

  const { winners } = useRouletteContext() as RouletteContext

  const {
    profilePicture = "/default.png",
    personName = "Anonymous",
    nickName = "User",
    isWinner = false,
    number = 0,
  } = props;

  const [imgSrc, setImgSrc] = useState<string>(defaultPicture);
  const [isFiller, setIsFiller] = useState<boolean>(false)

  useEffect(() => {
    const debounce = setTimeout(() => {
      setIsFiller(winners.filter(participant => participant.number == number).length == 0)

      if(profilePicture.includes('https://static-cdn.jtvnw.net')) {
        setImgSrc(profilePicture)
      } else if(!(profilePicture.includes('default'))) {
        setImgSrc(profilePicture)
      }
    }, 400);

    return () => {
      clearTimeout(debounce)
    }
  }, [])

  return (
    <div
      className={cn(style.PersonCard, isFiller ? style.filler : '')}
      id={isWinner ? `winner` : ""}
      data-number={number}
    >
      <div className={style.PersonCardWrapper}>
        <div className={style.ProfilePicture}>
          {isFiller ? <h1>X</h1> : <Image
            src={imgSrc}
            width={60}
            height={60}
            priority={false}
            alt={`Foto de perfil de ${personName}`}
            onError={(e) => {
              e.preventDefault();
              setImgSrc(defaultPicture);
            }}
          />}
        </div>
        <div className={style.ProfileInfo}>
          <h3>{personName}</h3>
          <p>{nickName}</p>
        </div>
      </div>
    </div>
  );
};

export default RouletteItem;
