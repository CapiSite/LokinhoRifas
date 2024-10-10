import Image from 'next/image';
import style from '../roletta.module.css';
import RewardList from './RewardList';

import HEROBACK from '../../../images/Roleta/Hero/HEROBACKGROUND.png';
import LINES from '../../../images/Roleta/Hero/Lines.png';
import { Raffle, RouletteContext, UserContextType } from 'utils/interfaces';
import { useRouletteContext } from 'contexts/RouletteContext';
import { useUserStateContext } from 'contexts/UserContext';
import NumberSorter from './NumberSorter';
import Confetti from 'react-confetti'
import { useEffect, useState } from 'react';
import Roulette from './Roulette';
import cn from 'classnames'


const Hero = ({ props }: { props: { isVisible: boolean, setIsVisible: React.Dispatch<React.SetStateAction<boolean>> } }) => {
  if (!props || !props.setIsVisible) {
    return null;
  }
  const { isVisible ,setIsVisible } = props;
  const { 
    manageWinner, 
    manageMockWinner, 
    isButtonActive, 
    participants = [],
    rewards = [],
    winners = [],
    availableRaffles = [],
    selectRaffle,
    isConfettiActive,
    winnerProperties, 
    raffle
  } = useRouletteContext() as RouletteContext

  const {
    userInfo
  } = useUserStateContext() as UserContextType

  const [ windowParams, setWindowParams ] = useState({width: 3840, height: 3840})
  const [ raffleList, setRaffleList ] = useState<Raffle[]>([])

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

  useEffect(() => {
    if (!raffle) return; // Adicionando verificação para garantir que `raffle` não seja indefinido.
    setRaffleList([]);
  
    const debounce = setTimeout(() => {
      const tempRaffleList = availableRaffles.filter(raffleItem => raffleItem.id !== (raffle?.id || 0));
   
      tempRaffleList.unshift(raffle);
  
      setRaffleList(tempRaffleList);
    }, 200);
  
    return () => clearTimeout(debounce);
  }, [raffle?.id, availableRaffles]); // Usando o operador opcional `?.`
  

  const winnerIsCorrected = winners.filter(winner => winner.number === winnerProperties?.number).length !== 0;

  // useEffect(() => {
  //   console.log(!isButtonActive, !winnerIsCorrected, (!winnerProperties?.distanceFromCenter), ' (', !winnerProperties?.distanceFromCenter, participants.length < 100, ') ', participants.length === 0, rewards.length === 0, winnerProperties?.distanceFromCenter)
  // }, [manageMockWinner])

  return (
    <section className={style.Roleta}>
      <div className={style.RoletaWrapper}>
        {isConfettiActive && <Confetti width={windowParams.width} height={windowParams.height}/>}
        <div className={style.HeroFrontImage}>
        </div>
        <RewardList props={{ isVisible, setIsVisible }} />
        {participants.length >= 100 ? 
          <NumberSorter /> :
          <Roulette />
        }

        <div className={style.ButtonGroup}>
          <button disabled={!isButtonActive || !winnerIsCorrected || (!winnerProperties?.distanceFromCenter && participants.length < 100) || participants.length === 0 || rewards.length === 0} onClick={() => manageMockWinner()} >Giro Teste</button>
          {availableRaffles.length > 0 && 
          <select disabled={!isButtonActive} name='raffleSelector' className={cn(style.raffleSelector, style.mobile, (windowParams.width < 550 || participants.length >= 100) ? style.Visible : '')} onChange={(e) => selectRaffle(Number(e.target.value))}>
            {raffleList.map((raffle) => <option key={raffle.id} value={raffle.id}>{raffle.name} {raffle.users_quantity - raffle.participants.length}%</option>)}
          </select>}
          <button disabled={!isButtonActive || !winnerIsCorrected || (!winnerProperties?.distanceFromCenter && participants.length < 100) || !userInfo.isAdmin || rewards.length === 0 || participants.length === 0} onClick={() => manageWinner()} >Girar Roleta</button>
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