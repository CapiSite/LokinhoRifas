import style from '../roletta.module.css';
import RouletteArray from './RouletteArray';
import Image from 'next/image';
import triangle from '../../../assets/pintriangle.svg';
import { Raffle, RouletteContext } from 'utils/interfaces';
import { useRouletteContext } from 'contexts/RouletteContext';
import EmptyRoulette from './EmptyRoulette';
import cn from 'classnames'
import { useEffect, useRef, useState } from 'react';
import StandBy from './StandBy';

const Roulette = () => {
  const { availableRaffles = [], selectRaffle, participants = [], isButtonActive, spinState, raffle } = useRouletteContext() as RouletteContext
  
  const [ raffleList, setRaffleList ] = useState<Raffle[]>([])
  const [ afk, setAfk ] = useState(true)

  
  useEffect(() => {
    const debounce = setTimeout(() => {
      if (!raffle) return; // Adicionando uma verificação para garantir que `raffle` não seja indefinido.
      const tempRaffleList = availableRaffles.filter(raffleItem => raffleItem.id != (raffle?.id || 0));
  
      tempRaffleList.unshift(raffle);
  
      setRaffleList(tempRaffleList);
    }, 200);
 
    return () => clearTimeout(debounce);
  }, [raffle?.id, availableRaffles]); // Verificando se `raffle.id` existe

  const afkTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const startAfkTimeout = () => {
    if (afkTimeoutRef.current) {
      clearTimeout(afkTimeoutRef.current);
    }

    afkTimeoutRef.current = setTimeout(() => {
      setAfk(false);
    }, 30000);
  };

  const cancelAfkTimeout = () => {
    if (afkTimeoutRef.current) {
      clearTimeout(afkTimeoutRef.current);
      afkTimeoutRef.current = null;
    }
    setAfk(true);
  };

  useEffect(() => {
    if (!spinState) {
      cancelAfkTimeout();
    } else {
      startAfkTimeout();
    }

    return () => {
      if (afkTimeoutRef.current) {
        clearTimeout(afkTimeoutRef.current);
      }
    };
  }, [spinState]);

  useEffect(() => {
    setAfk(false)
  }, [raffle?.id])

  return (
    <div className={style.Roulette}>
      <div className={style.RouletteBox} id='RouletteBox'>
        {(participants.length > 0 && participants.length !== raffle.users_quantity) && <h1 className={cn(style.Stock, afk ? style.running : '')}>Estoque restante: {raffle.users_quantity - participants.length}</h1>}

        {participants.length > 0 && <StandBy props={{afk}} />}

        {participants.length > 0 ? <RouletteArray /> : <EmptyRoulette />}
      </div>
      <div className={style.pin}>
        <Image height={50} width={30} src={triangle} alt='Pino da roleta' />
      </div>

      {availableRaffles.length > 0 && <select name='raffleSelectorRoulette' disabled={!isButtonActive} className={cn(style.raffleSelector, style.desktop)} onChange={(e) => selectRaffle(Number(e.target.value))}>
        {raffleList.map((raffle) => <option key={raffle.id} value={raffle.id}>{raffle.name} {(raffle.participants.length / raffle.users_quantity) * 100}%</option>)}
      </select>}
      
      <div className={style.background}>
        <div className={style.shadeLeft}></div>
        <div className={style.shadeRight}></div>
      </div>
    </div>
  );
}

export default Roulette;
