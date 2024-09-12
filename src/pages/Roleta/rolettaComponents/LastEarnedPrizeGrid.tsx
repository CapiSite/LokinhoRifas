import LastEarnedPrizes from './LastEarnedPrize';
import style from '../roletta.module.css';
import Image from 'next/image';
import GIFTIcon from '../../../assets/gift.svg';
import PRIZESBACKGROUND from '../../../images/Roleta/Prizes/PRIZESBACKGROUND.png';
import { useLastEarnedState } from 'contexts/LastEarnedContext';
import { LastEarnFrontEndType } from 'utils/interfaces';

const LastEarnedPrizeGrid = () => {
  const { lastEarnedList } = useLastEarnedState() as { lastEarnedList: LastEarnFrontEndType[]};

  return (
    <section className={style.LastPrizes}>
      <div className={style.LastPrizesWrapper}>
        <div className={style.title}>
          <Image priority={false} src={GIFTIcon} alt='Icone de prêmios'/>
          <h2>Últimos Prêmios</h2>
        </div>
        <div className={style.EarnedPrizesGrid}>
          {lastEarnedList && lastEarnedList.map((item, index) => {
            if (index < 8) return <LastEarnedPrizes key={index} props={{item, index}} />;
          })}
        </div>
      </div>
      <div className={style.background}>
        <Image priority={false} src={PRIZESBACKGROUND} alt="Fundo de tela"/>
      </div>
      <div className={style.glowGroup}>
        <div className={style.growGroupWrapper}>
          <div className={style?.["glow-0"]}></div>
        </div>
      </div>
    </section>
  );
}

export default LastEarnedPrizeGrid;
