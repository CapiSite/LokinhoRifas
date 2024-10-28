import style from "../roletta.module.css";
import Image from "next/image";
import { CardItemType } from "utils/interfaces";
import cn from "classnames";
import defaultPicture from "../../../assets/defaultProfilePic.svg";
import React, { useMemo, useState } from "react";

const RouletteItem = React.memo(
  ({ props }: { props?: CardItemType }) => {
    // Desestruturar as props com valores padrão
    const {
      profilePicture = "",
      personName = "Unknown",
      number = 0,
      isWinner = false,
    } = props || {};

    // Estado para gerenciar a fonte da imagem dinamicamente
    const [imgSrc, setImgSrc] = useState<string>(defaultPicture);

    // Calcular a fonte da imagem com base no profilePicture
    useMemo(() => {
      if (!profilePicture) {
        setImgSrc(defaultPicture);
      } else if (profilePicture.includes("https://static-cdn.jtvnw.net")) {
        setImgSrc(profilePicture);
      } else if (!profilePicture.includes("default")) {
        setImgSrc(profilePicture);
      }
    }, [profilePicture]);

    return (
      <div
        data-number={number}
        id={isWinner ? "winner" : ""}
        className={cn(style.PersonCard)}
      >
        <div className={style.PersonCardWrapper}>
          <div className={style.ProfilePicture}>
            <Image
              src={imgSrc}
              width={500}
              height={500}
              alt={`Foto de perfil de ${personName}`}
              onError={() => setImgSrc(defaultPicture)} // Voltar para a imagem padrão em caso de erro
            />
          </div>
          <div className={style.ProfileInfo}>
            <h3>{personName}#{number}</h3>
          </div>
        </div>
      </div>
    );
  },
  (prevProps, nextProps) => {
    // Função de comparação para evitar re-renderizações desnecessárias
    return (
      prevProps.props?.profilePicture === nextProps.props?.profilePicture &&
      prevProps.props?.isWinner === nextProps.props?.isWinner &&
      prevProps.props?.number === nextProps.props?.number
    );
  }
);

export default RouletteItem;
