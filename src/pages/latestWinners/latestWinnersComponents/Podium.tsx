import { useLastEarnedState } from 'contexts/LastEarnedContext';
import style from '../latestWinners.module.css'
import cn from 'classnames'
import { LastEarnedContextType } from 'utils/interfaces';
import Image from 'next/image';
import defaultProfilePic from '../../../assets/defaultProfilePic2.svg'
import React from 'react';

const Podium = ({ props }: { props: {openTab: string, setOpenTab: React.Dispatch<React.SetStateAction<string>>} }) => {
  if(!props) return <h1>Erro nos props do Podium.tsx</h1>
  const { openTab, setOpenTab } = props
  const { playerRank = [] } = useLastEarnedState() as LastEarnedContextType

  const handleClick = (newActiveTab: string) => {
    setOpenTab(newActiveTab)
  }

  return (
    <div className={cn(style.col2, style.top)}>
      <h2>Top jogadores do rank</h2>
      <div className={style.podium}>
        {playerRank.length > 2 && <div className={style.silverMedal}>
          {playerRank[1].profilePicture && <Image width={90} height={90} src={playerRank[1].profilePicture.includes('default') ? defaultProfilePic : playerRank[1].profilePicture} alt='Imagem de perfil' />}
          <div className={style.podiumBlock}>
            <h3>{playerRank[1].name}</h3>
            <p>{playerRank[1].winCount}</p>
          </div>
        </div>}
        {playerRank.length > 1 && <div className={style.goldMedal}>
          {playerRank[0].profilePicture && <Image width={90} height={90} src={playerRank[0].profilePicture.includes('default') ? defaultProfilePic : playerRank[0].profilePicture} alt='Imagem de perfil' />}
          <div className={style.podiumBlock}>
            <h3>{playerRank[0].name}</h3>
            <p>{playerRank[0].winCount}</p>
          </div>
        </div>}
        {playerRank.length > 3 && <div className={style.bronzeMedal}>
          {playerRank[2].profilePicture && <Image width={90} height={90} src={playerRank[2].profilePicture.includes('default') ? defaultProfilePic : playerRank[2].profilePicture} alt='Imagem de perfil' />}
          <div className={style.podiumBlock}>
            <h3>{playerRank[2].name}</h3>
            <p>{playerRank[2].winCount}</p>
          </div>
        </div>}
      </div>

      <div className={cn(style.buttonGroup, style.mobile)}>
        <button onClick={() => handleClick('winners')} className={openTab == 'winners' ? style.active : ''}>Últimos Ganhadores</button>
        <button onClick={() => handleClick('rank')} className={openTab == 'rank' ? style.active : ''}>Rank</button>
      </div>
    </div>
  );
}
 
export default Podium;