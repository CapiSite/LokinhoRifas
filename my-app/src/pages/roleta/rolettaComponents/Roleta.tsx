import Image from 'next/image';
import style from '../roletta.module.css';
import RewardList from './RewardList';

import HEROBACK from '../../../images/Roleta/Hero/HEROBACKGROUND.png';
import LINES from '../../../images/Roleta/Hero/Lines.png';
import { RouletteContext, UserContextType } from 'utils/interfaces';
import { useRouletteContext } from 'contexts/RouletteContext';
import { useUserStateContext } from 'contexts/UserContext';
import NumberSorter from './NumberSorter';
import Confetti from 'react-confetti'
import { useEffect, useState } from 'react';
import Roulette from './Roulette';


const Hero = () => {
  const { 
    manageWinner, 
    manageMockWinner, 
    isButtonActive, 
    participants = [],
    rewards = [],
    winners = [],
    isConfettiActive,
    winnerProperties, 
  } = useRouletteContext() as RouletteContext

  const {
    userInfo
  } = useUserStateContext() as UserContextType

  const [ windowParams, setWindowParams ] = useState({width: 3840, height: 3840})

  const handleResize = (e: Event) => {
    const target = e.target as Window
    
    setWindowParams(prev => ({
      width: target.innerWidth,
      height: prev.height
    }))
  }

  
  useEffect(() => {
    window.addEventListener('resize', e => handleResize(e))

    return () => {
      window.removeEventListener('resize', e => handleResize(e))
    }
  }, [])

  const winnerIsCorrected = winners.filter(winner => winner.number === winnerProperties?.number).length !== 0;

  return (
    <section className={style.Roleta}>
      <div className={style.RoletaWrapper}>
        {isConfettiActive && <Confetti width={windowParams.width} height={windowParams.height}/>}
        <div className={style.HeroFrontImage}>
        </div>
        <RewardList />
        {participants?.length >= 100 ? 
          <NumberSorter /> :
          <Roulette />
        }

        <div className={style.ButtonGroup}>
          <button disabled={!isButtonActive || !winnerIsCorrected || (!winnerProperties?.distanceFromCenter && participants?.length < 100) || participants?.length === 0 || rewards.length === 0} onClick={() => manageMockWinner()} >Giro Teste</button>
          <button disabled={!isButtonActive || !winnerIsCorrected || (!winnerProperties?.distanceFromCenter && participants?.length < 100) || !userInfo.isAdmin || rewards.length === 0 || participants?.length === 0} onClick={() => manageWinner()} >Girar Roleta</button>
        </div>
      </div>

      <div className={style.background}>
        <Image priority={false} src={HEROBACK} alt='Imagem de fundo'/>
      </div>
      <div className={style.glowGroup}>
        <div className={style.growGroupWrapper}>
          <div className={style?.["glow-0"]}></div>
        </div>
      </div>
      <Image height={1004} width={2304} src={LINES} priority={false} alt='Imagem de fundo'/>
    </section>
  );
}

export default Hero;