import style from '../roletta.module.css'
import RewardsArray from './RewardArray';
import cn from 'classnames'

const RewardList = () => {
  return (
    <div className={style.RewardsList}>
      <div className={cn(style.desktop, style.RewardsAd)}>
        <div className={style.RewardsAdContent}>
          <p><span className={style.highlight}>NOVOS</span> PRÊMIOS</p>
          <button>Faça Parte</button>
        </div>
      </div>
        <RewardsArray />
      <div className={cn(style.mobile, style.RewardsAd)}>
        <div className={style.RewardsAdContent}>
          <p><span className={style.highlight}>NOVOS</span> PRÊMIOS</p>
          <button>Faça Parte</button>
        </div>
      </div>
    </div>
  );
}
 
export default RewardList;