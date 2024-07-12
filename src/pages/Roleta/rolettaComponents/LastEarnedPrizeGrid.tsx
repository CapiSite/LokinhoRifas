import LastEarnedPrizes from './LastEarnedPrize';
import style from '../roletta.module.css'

import Image from 'next/image';

import GIFTIcon from '../../../assets/gift.svg'

const LastEarnedPrizeGrid = () => {

  const items = [
    {
      TimeOfEarning: '21 horas',
      ChanceOfEarning: '25%',
      PoolType: 'Gold',
      ItemName: 'Nome da Skin',
      ItemType: 'Tipo da Skin',
      ItemValue: '1,000'
    },
    {
      TimeOfEarning: '21 horas',
      ChanceOfEarning: '25%',
      PoolType: 'Silver',
      ItemName: 'Nome da Skin',
      ItemType: 'Tipo da Skin',
      ItemValue: '1,000'
    },
    {
      TimeOfEarning: '21 horas',
      ChanceOfEarning: '25%',
      PoolType: 'Gold',
      ItemName: 'Nome da Skin',
      ItemType: 'Tipo da Skin',
      ItemValue: '1,000'
    },
    {
      TimeOfEarning: '21 horas',
      ChanceOfEarning: '25%',
      PoolType: 'Gold',
      ItemName: 'Nome da Skin',
      ItemType: 'Tipo da Skin',
      ItemValue: '1,000'
    },
    {
      TimeOfEarning: '21 horas',
      ChanceOfEarning: '25%',
      PoolType: 'Silver',
      ItemName: 'Nome da Skin',
      ItemType: 'Tipo da Skin',
      ItemValue: '1,000'
    },
    {
      TimeOfEarning: '21 horas',
      ChanceOfEarning: '25%',
      PoolType: 'Gold',
      ItemName: 'Nome da Skin',
      ItemType: 'Tipo da Skin',
      ItemValue: '1,000'
    },
    {
      TimeOfEarning: '21 horas',
      ChanceOfEarning: '25%',
      PoolType: 'Gold',
      ItemName: 'Nome da Skin',
      ItemType: 'Tipo da Skin',
      ItemValue: '1,000'
    },
    {
      TimeOfEarning: '21 horas',
      ChanceOfEarning: '25%',
      PoolType: 'Silver',
      ItemName: 'Nome da Skin',
      ItemType: 'Tipo da Skin',
      ItemValue: '1,000'
    },
    {
      TimeOfEarning: '21 horas',
      ChanceOfEarning: '25%',
      PoolType: 'Gold',
      ItemName: 'Nome da Skin',
      ItemType: 'Tipo da Skin',
      ItemValue: '1,000'
    },
  ]

  return (
    <section className={style.LastPrizes}>
      <div className={style.LastPrizesWrapper}>
        <div className={style.title}>
          <Image src={GIFTIcon} alt='Icone de prêmios'/>
          <h2>Últimos Prêmios</h2>
        </div>
        <div className={style.EarnedPrizesGrid}>
            {items.map((item, index) => {
              if(index < 10) return <LastEarnedPrizes props={item}/>
            })}
        </div>
      </div>
    </section>
  );
}
 
export default LastEarnedPrizeGrid;