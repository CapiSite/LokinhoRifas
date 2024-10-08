import style from "../roletta.module.css";
import Image, { StaticImageData } from "next/image";
import { CardItemType, RouletteContext } from "utils/interfaces";
import cn from "classnames";

import defaultPicture from "../../../assets/defaultProfilePic.svg";
import { useEffect, useState } from "react";
import { useRouletteContext } from "contexts/RouletteContext";
import React from "react";

const RouletteItem = React.memo(({ props }: { props: CardItemType }) => {
  const { profilePicture, personName, number, isWinner } = props;

  const [imgSrc, setImgSrc] = useState<string>(profilePicture);

  useEffect(() => {
    if (profilePicture !== imgSrc) {
      setImgSrc(profilePicture);
    }
  }, [profilePicture, imgSrc]);

  return (
    <div className={cn(style.PersonCard, isWinner ? style.winner : '')}>
      <div className={style.PersonCardWrapper}>
        <div className={style.ProfilePicture}>
          <Image
            src={imgSrc}
            width={500}
            height={500}
            alt={`Foto de perfil de ${personName}`}
            onError={(e) => setImgSrc(defaultPicture)}
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