import style from '../roletta.module.css'
import RewardsArray from './RewardArray';

const RewardList = () => {

  return (
    <div className={style.RewardsList}>
      <div className={style.RewardsAd}>
        <p><span className={style.highlight}>NOVOS</span> PRÊMIOS</p>
        <button>Faça Parte</button>
      </div>
        <RewardsArray />

    </div>
  );
}
 
export default RewardList;