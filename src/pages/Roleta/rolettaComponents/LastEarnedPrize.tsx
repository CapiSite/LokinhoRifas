import style from '../roletta.module.css'
import cn from 'classnames'

import GOLDIcon from '../../../assets/GOLD.svg'
import SILVERIcon from '../../../assets/SILVER.svg'

import Image from 'next/image';

const LastEarnedPrizes = ({props}: any) => {

  const { TimeOfEarning, ChanceOfEarning, PoolType, ItemName, ItemType, ItemValue } = props

  return (
    <div className={cn(style.EarnedPrizeItem, style?.[PoolType])}>
      <div className={style.ItemMetaInfo}>
        <p>Foi sorteado há<br />{TimeOfEarning}</p>
        <p>Chance<br />{ChanceOfEarning}</p>
      </div>

      <Image src={''} alt={`Imagem de ${ItemName}`}/>

      <div className={style.ItemDescription}>
        <div className={style.PrizePoolType}>
          <Image src={PoolType == 'Gold' ? GOLDIcon : SILVERIcon} alt={`Ícone da Rifa ${PoolType == 'Gold' ? 'Gold' : 'Silver'}`}/>
          <h3>RIFA {PoolType}</h3>
        </div>

        <div className={style.ItemContent}>
          <h2>{ItemName}</h2>
          <p>{ItemType}</p>
        </div>

        <div className={style.ItemValue}>
          <h3>R$ {ItemValue},00</h3>
        </div>
      </div>
    </div>
  );
}
 
export default LastEarnedPrizes;