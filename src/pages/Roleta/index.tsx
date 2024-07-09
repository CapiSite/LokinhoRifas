import style from './roletta.module.css'
import LastEarnedPrizeGrid from './rolettaComponents/LastEarnedPrizeGrid';
import RewardList from './rolettaComponents/RewardList';
import Roulette from './rolettaComponents/Roulette';

const TempRoleta = () => {
  return (
    <section className={style.Roleta}>
      <div className={style.RoletaWrapper}>
        <RewardList />
        <Roulette />

        <button>Girar Roleta</button>

        <LastEarnedPrizeGrid />
      </div>
    </section>
  );
}
 
export default TempRoleta;