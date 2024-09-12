import { LastEarnedContextProvider } from 'contexts/LastEarnedContext';
import style from './latestWinners.module.css'
import LatestWinnersTable from './latestWinnersComponents/LatestWinnersTable';
import Podium from './latestWinnersComponents/Podium';
import WinnersRank from './latestWinnersComponents/WinnersRank';
import cn from 'classnames'

import PRIZESBACKGROUND from '../../images/Roleta/Prizes/PRIZESBACKGROUND.png'
import NewBackground from '../../images/Homepage/ServicesDisplay/backgroundScene.png'
import Image from 'next/image';
import { useState } from 'react';

const LatestWinners = () => {
  const [ openTab, setOpenTab ] = useState('winners')
  const formatarDataHora = (date: string): string => {
    const getDate = new Date(date)

    const dia = String(getDate.getDate()).padStart(2, "0");
    const mes = String(getDate.getMonth() + 1).padStart(2, "0");
    const ano = getDate.getFullYear();
    const horas = String(getDate.getHours()).padStart(2, "0");
    const minutos = String(getDate.getMinutes()).padStart(2, "0");

    return `${dia}/${mes}/${ano}, às ${horas}:${minutos}`;
  };

  return (
    <>
      <LastEarnedContextProvider>
        <div className={cn(style.latestWinners, style?.[openTab])}>
          <div className={style.latestWinnersWrapper}>
            <LatestWinnersTable props={{formatarDataHora}}/>
            <Podium props={{openTab, setOpenTab}}/>
            <WinnersRank />
            <div className={style.background}>
              <Image priority={false} src={PRIZESBACKGROUND} alt="Fundo de tela"/>
              <Image priority={false} src={NewBackground} alt="Fundo de tela"/>
            </div>
            <div className={style.glowGroup}>
              <div className={style?.["glow-1"]}></div>
              <div className={style?.["glow-2"]}></div>
            </div>
          </div>
        </div>
      </LastEarnedContextProvider>
    </>
  );
}
 
export default LatestWinners;