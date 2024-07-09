import style from '../roletta.module.css'
import cn from 'classnames'

import GOLDIcon from '../../../assets/GOLD.svg'
import SILVERIcon from '../../../assets/SILVER.svg'

import Image from 'next/image';

const RewardItem = ({props}: any) => {

  const { type, itemImageUrl, itemImageAlt, itemName, itemType, itemValue } = props

  return (
  <div className={cn(style.Reward, style?.[type])}>
    <div className={style.RewardType}>
      <Image priority={false} src={type == 'Gold' ? GOLDIcon : SILVERIcon} alt={type == 'Gold' ? 'Icone Gold' : 'Icone Silver'} />
      <h3>RIFA {type == 'Gold' ? 'GOLD' : 'SILVER'}</h3>
    </div>
    <div className={style.RewardContent}>
      <img src={itemImageUrl} alt={itemImageAlt} />
      <div className={style.RewardDescription}>
        <h2>{itemName}</h2>
        <p>{itemType}</p>
      </div>
    </div>
    <div className={style.RewardValue}>
      <h3>R$ {itemValue},00</h3>
    </div>
  </div>
  );
}
 
export default RewardItem;