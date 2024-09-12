import { useRouletteContext } from 'contexts/RouletteContext';
import style from '../roletta.module.css';
import { RouletteContext } from 'utils/interfaces';

const EmptyRoulette = () => {
  const {availableRaffles = []} = useRouletteContext() as RouletteContext

  return (
    <div className={style.emptyRoulette}><h1>{availableRaffles.length == 0 ? 'Sem Rifas no momento' : 'Rifa sem participantes ainda!'}</h1></div>
  );
}
 
export default EmptyRoulette;