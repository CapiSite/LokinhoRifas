import { useUserStateContext } from 'contexts/UserContext';
import style from '../roletta.module.css'
import RewardsArray from './RewardArray';
import cn from 'classnames'
import { RouletteContext, UserContextType } from 'utils/interfaces';
import { useRouter } from 'next/router';
import { useRouletteContext } from 'contexts/RouletteContext';

const RewardList = () => {
  const { setShowRafflePopup, userInfo } = useUserStateContext() as UserContextType
  const { availableRaffles, selectRaffle, isButtonActive, raffle } = useRouletteContext() as RouletteContext

  const router = useRouter()

  const handleShowRaffles = () => {
    if (userInfo.token !== '') {
      setShowRafflePopup(true);
    } else {
      router.push('/login');
    }
  }

  const loading = Math.round((raffle.participants.length / raffle.users_quantity) * 10)
  const loader = Array.from({ length: 10 }, (_, i) => i)

  return (
    <>
      {availableRaffles.length > 0 && 
      <div className={style.raffleSelectWrapper}>
        <select disabled={!isButtonActive} name='raffleSelector' value={raffle.id || availableRaffles[0].id} className={cn(style.raffleSelector)} onChange={(e) => selectRaffle(Number(e.target.value))}>
          {availableRaffles.map((raffle) => <option key={raffle.id} value={raffle.id}>{raffle.name.toUpperCase()}</option>)}
        </select>

        <div className={style.loaderContent}>
          <h2>{Math.round((raffle.participants.length / raffle.users_quantity) * 100)}%</h2>
          <div className={style.loader}>
            <div className={style.loaderWrapper}>
              {loader.map((tick, index) => <div key={index} className={cn(style.loaderTick, loading > index && style.activeTick)}></div>)}
            </div>
          </div>
        </div>
      </div>
      }
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
    </>
  );
}
 
export default RewardList;