import style from "../roletta.module.css";
import Image, { StaticImageData } from "next/image";
import { CardItemType } from "utils/interfaces";
import cn from "classnames";

import defaultPicture from "../../../assets/defaultProfilePic.svg";
import { useEffect, useState } from "react";

const RouletteItem = ({ props }: { props: CardItemType }) => {
  if (!props) {
    return <div>Error: No props provided</div>;
  }

  const {
    profilePicture = "/default.png",
    personName = "Anonymous",
    nickName = "User",
    isWinner = false,
    number = 0,
  } = props;

  const [imgSrc, setImgSrc] = useState<string | StaticImageData>(defaultPicture);

  useEffect(() => {
    const checkImageExists = async (url: string) => {
      try {
        const response = await fetch(url, { method: "HEAD" });
        if (response.ok) {
          setImgSrc(url);
        }
      } catch (error) {
        setImgSrc(defaultPicture);
      }
    };

    if (profilePicture && !profilePicture.includes('default')) {
      checkImageExists(profilePicture);
    }
  }, [profilePicture]);

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
            alt={`Foto de perfil de ${personName}`}
            onError={(e) => {
              e.preventDefault();
              setImgSrc(defaultPicture);
            }}
          />
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
