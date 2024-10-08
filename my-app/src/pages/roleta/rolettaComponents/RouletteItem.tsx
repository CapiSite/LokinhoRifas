import style from "../roletta.module.css";
import Image from "next/image";
import { CardItemType } from "utils/interfaces";
import cn from "classnames";
import defaultPicture from "../../../assets/defaultProfilePic.svg";
import { useEffect, useState } from "react";
import React from "react";

const RouletteItem = React.memo(
  ({ props }: { props?: CardItemType }) => {
    // Desestruturando props
    const {
      profilePicture = '',
      personName = 'Unknown',
      number = 0,
      isWinner = false,
    } = props || {};

    const [imgSrc, setImgSrc] = useState<string>(defaultPicture);

    // Atualize a imagem apenas se a 'profilePicture' mudar
    useEffect(() => {
      console.log("oi")
      if (profilePicture && profilePicture !== imgSrc) {
        if (profilePicture.includes('https://static-cdn.jtvnw.net')) {
          setImgSrc(profilePicture);
        } else if (!profilePicture.includes('default')) {
          setImgSrc(profilePicture);
        }
      }
    }, [profilePicture]); // Somente 'profilePicture' é a dependência

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
              onError={() => {
                if (imgSrc !== defaultPicture) {
                  setImgSrc(defaultPicture);
                }
              }}
            />
          </div>
          <div className={style.ProfileInfo}>
            <h3>{personName}#{number}</h3>
          </div>
        </div>
      </div>
    );
  },
  // Função de comparação para evitar re-renderizações desnecessárias
  (prevProps:any, nextProps:any) => {
    return (
      prevProps.props.profilePicture === nextProps.props.profilePicture &&
      prevProps.props.isWinner === nextProps.props.isWinner &&
      prevProps.props.number === nextProps.props.number
    );
  }
);

export default RouletteItem;
