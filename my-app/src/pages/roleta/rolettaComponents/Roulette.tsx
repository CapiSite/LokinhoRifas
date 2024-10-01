import style from '../roletta.module.css';
import RouletteArray from './RouletteArray';
import Image from 'next/image';
import triangle from '../../../assets/pintriangle.svg';
import { Raffle, RouletteContext } from 'utils/interfaces';
import { useRouletteContext } from 'contexts/RouletteContext';
import EmptyRoulette from './EmptyRoulette';
import cn from 'classnames'
import { useEffect, useState } from 'react';

const Roulette = () => {
  const { availableRaffles = [], selectRaffle, participants = [], isButtonActive, raffle } = useRouletteContext() as RouletteContext
  
  const [ raffleList, setRaffleList ] = useState<Raffle[]>([])

  
  useEffect(() => {
    const debounce = setTimeout(() => {
      if (!raffle) return; // Adicionando uma verificação para garantir que `raffle` não seja indefinido.
      const tempRaffleList = availableRaffles.filter(raffleItem => raffleItem.id != (raffle?.id || 0));
  
      tempRaffleList.unshift(raffle);
  
      setRaffleList(tempRaffleList);
    }, 200);
 
    return () => clearTimeout(debounce);
 }, [raffle?.id, availableRaffles]); // Verificando se `raffle.id` existe

  return (
    <div className={style.Roulette}>
      <div className={style.RouletteBox}>
        {participants.length > 0 ? <RouletteArray /> : <EmptyRoulette />}
      </div>
      <div className={style.pin}>
        <Image height={50} width={30} src={triangle} alt='Pino da roleta' />
      </div>

      {availableRaffles.length > 0 && <select name='raffleSelectorRoulette' disabled={!isButtonActive} className={cn(style.raffleSelector, style.desktop)} onChange={(e) => selectRaffle(Number(e.target.value))}>
        {raffleList.map((raffle) => <option key={raffle.id} value={raffle.id}>{raffle.name}</option>)}
      </select>}
      
      <div className={style.background}>
        <div className={style.shadeLeft}></div>
        <div className={style.shadeRight}></div>
      </div>
    </div>
  );
}

export default Roulette;
