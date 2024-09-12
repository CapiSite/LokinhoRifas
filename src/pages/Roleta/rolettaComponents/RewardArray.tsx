import { RouletteContext } from 'utils/interfaces';
import style from '../roletta.module.css';
import RewardItem from './RewardItem';
import { useRouletteContext } from 'contexts/RouletteContext';

const RewardsArray = () => {
  const { rewards = [] } = useRouletteContext() as RouletteContext

  return (
    <div className={style.RewardsArray}>
      {rewards && rewards.map((item, index) => {
        if (index < 4) return <RewardItem key={index} props={{item, index}} />;
      })}
    </div>
  );
}

export default RewardsArray;
