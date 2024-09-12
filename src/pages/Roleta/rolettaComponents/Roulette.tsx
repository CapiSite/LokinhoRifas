import style from '../roletta.module.css';
import RouletteArray from './RouletteArray';
import Image from 'next/image';
import triangle from '../../../assets/pintriangle.svg';
import { RouletteContext } from 'utils/interfaces';
import { useRouletteContext } from 'contexts/RouletteContext';
import EmptyRoulette from './EmptyRoulette';

const Roulette = () => {
  const { availableRaffles = [], selectRaffle, participants = [], isButtonActive } = useRouletteContext() as RouletteContext

  return (
    <div className={style.Roulette}>
      <div className={style.RouletteBox}>
        {participants.length > 0 ? <RouletteArray /> : <EmptyRoulette />}
      </div>
      <div className={style.pin}>
        <Image src={triangle} alt='Pino da roleta' />
      </div>

      {availableRaffles.length > 0 && <select disabled={!isButtonActive} className={style.raffleSelector} onChange={(e) => selectRaffle(Number(e.target.value))}>
        {availableRaffles.filter(raffle => raffle.raffleSkins.length > 0).map((raffle) => <option key={raffle.id} value={raffle.id}>{raffle.name}</option>)}
      </select>}
      
      <div className={style.background}>
        <div className={style.shadeLeft}></div>
        <div className={style.shadeRight}></div>
      </div>
    </div>
  );
}

export default Roulette;
