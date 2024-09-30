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

  const {
    profilePicture,
    personName,
    nickName,
    isWinner,
    number,
    distanceFromCenter
  } = props;

  const [imgSrc, setImgSrc] = useState<string>(defaultPicture);

  useEffect(() => {
    const debounce = setTimeout(() => {
      if(isWinner) {
        // console.count('Item 2 foi renderizado: ')
        // console.log('item data: \n', 
        //   profilePicture,
        //   personName,
        //   nickName,
        //   isWinner,
        //   number,
        //   distanceFromCenter
        // )
      }
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
      className={cn(style.PersonCard)}
      id={isWinner ? `winner` : ""}
      data-number={number}
    >
      <div className={style.PersonCardWrapper}>
        <div className={style.ProfilePicture}>
          <Image
            src={imgSrc}
            width={60}
            height={60}
            priority={false}
            alt={`Foto de perfil de ${personName}`}
            onError={(e) => {
              e.preventDefault();
              setImgSrc(defaultPicture);
            }}
          />
        </div>
        <div className={style.ProfileInfo}>
          <h3>{personName}#{number}</h3>
        </div>
      </div>
    </div>
  );
};

export default RouletteItem;
