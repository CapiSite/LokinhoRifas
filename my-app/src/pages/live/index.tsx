import React, { useContext, useEffect, useState } from "react";
import style from './live.module.css';
import { TwitchEmbed } from "react-twitch-embed";
import axios from "axios";
import { TextContext } from "contexts/TextContext";
import { TextContextType } from "utils/interfaces";

const Twitch = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [ videoWidth, setVideoWidth ] = useState(0)
  const [ videoHeight, setVideoHeight ] = useState(0)
  const { textInfo, setTextInfo } = useContext(TextContext) as TextContextType;

  useEffect(() => {
    axios.get(process.env.NEXT_PUBLIC_REACT_NEXT_APP + "/text").then((res: any) => {
      setTextInfo(res.data);
    }).catch((err: any) => {
      console.error(err.response ? err.response.data : 'Erro ao buscar dados');
    });

    
    const handleResize = () => {
      setVideoWidth(Number(window.innerWidth - 200))
      setVideoHeight(Number(window.innerHeight - 500))
      setIsLoading(true);
    };

    handleResize(); // Chama a função imediatamente para definir o estado inicial

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);



  return (
    <div className={style.live}>
      <div className={style.liveWrapper}>
        <h1>{isLoading && textInfo.text}</h1>
        <div className={style.liveFeed}>
          <TwitchEmbed channel="evandro_vidal" width={videoWidth} height={videoHeight} />
        </div>
      </div>
    </div>
  );
};

export default Twitch;