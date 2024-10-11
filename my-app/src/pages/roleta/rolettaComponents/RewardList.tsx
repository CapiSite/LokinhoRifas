import { useUserStateContext } from 'contexts/UserContext';
import style from '../roletta.module.css'
import RewardsArray from './RewardArray';
import cn from 'classnames'
import { UserContextType } from 'utils/interfaces';
import { useRouter } from 'next/router';

const RewardList = () => {
  const { setShowRafflePopup, userInfo } = useUserStateContext() as UserContextType

  const router = useRouter()

  const handleShowRaffles = () => {
    if (userInfo.token !== '') {
      setShowRafflePopup(true);
    } else {
      router.push('/login');
    }
  }

  return (
    <div className={style.RewardsList}>
      <div className={cn(style.desktop, style.RewardsAd)}>
        <div className={style.RewardsAdContent}>
          <p><span className={style.highlight}>NOVOS</span> PRÊMIOS</p>
          <button  onClick={()=>handleShowRaffles()}>Faça Parte</button>
        </div>
      </div>
        <RewardsArray />
      <div className={cn(style.mobile, style.RewardsAd)}>
        <div className={style.RewardsAdContent}>
          <p><span className={style.highlight}>NOVOS</span> PRÊMIOS</p>
          <button onClick={()=>handleShowRaffles()}>Faça Parte</button>
        </div>
      </div>
    </div>
  );
}
 
export default RewardList;