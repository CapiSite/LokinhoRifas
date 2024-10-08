import style from "../roletta.module.css";
import Image from "next/image";
import { CardItemType } from "utils/interfaces";
import cn from "classnames";

import defaultPicture from "../../../assets/defaultProfilePic.svg";
import { useEffect, useState } from "react";
import React from "react";

const RouletteItem = React.memo(({ props }: { props?: CardItemType }) => {
  // Ensure props is defined and has the necessary properties
  const {
    profilePicture = '',
    personName = 'Unknown',
    number = 0,
    debugWinners = false,
    isWinner = false,
  } = props || {}; // Use empty object if props is undefined

  const [imgSrc, setImgSrc] = useState<string>(defaultPicture);

  useEffect(() => {
    if (!profilePicture) return;

    if (profilePicture.includes('https://static-cdn.jtvnw.net')) {
      setImgSrc(profilePicture);
    } else if (!profilePicture.includes('default') && profilePicture !== imgSrc) {
      setImgSrc(profilePicture);
    }
  }, [profilePicture, imgSrc]);

  return (
    <div
      data-number={number}
      id={isWinner ? 'winner' : ''}
      className={cn(style.PersonCard)}
    >
      <div className={style.PersonCardWrapper}>
        <div className={style.ProfilePicture}>
          <Image
            src={imgSrc}
            width={500}
            height={500}
            alt={`Foto de perfil de ${personName}`}
            onError={() => setImgSrc(defaultPicture)}
          />
        </div>
        <div className={style.ProfileInfo}>
          <h3>{personName}#{number}</h3>
        </div>
      </div>
    </div>
  );
});

export default RouletteItem;