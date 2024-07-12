import style from '../roletta.module.css';
import cn from 'classnames';

import GOLDIcon from '../../../assets/GOLD.svg';
import SILVERIcon from '../../../assets/SILVER.svg';

import Image from 'next/image';
import { RewardItemType } from 'utils/interfaces';

const RewardItem = ({ props }: { props: RewardItemType }) => {
  if (!props) {
    return <div>Error: No props provided</div>;
  }

  const {
    type = 'Silver', // Default to 'Silver' if type is not provided
    itemImageUrl = '/default-item.png', // Default item image URL
    itemImageAlt = 'Item image', // Default alt text for item image
    itemName = 'Default Item', // Default item name
    itemType = 'Default Type', // Default item type
    itemValue = '0.00' // Default item value
  } = props;

  return (
    <div className={cn(style.Reward, style?.[type])}>
      <div className={style.RewardType}>
        <Image
          priority={false}
          src={type === 'Gold' ? GOLDIcon : SILVERIcon}
          alt={type === 'Gold' ? 'Icone Gold' : 'Icone Silver'}
        />
        <h3>RIFA {type === 'Gold' ? 'GOLD' : 'SILVER'}</h3>
      </div>
      <div className={style.RewardContent}>
        <img src={itemImageUrl} alt={itemImageAlt} />
        <div className={style.RewardDescription}>
          <h2>{itemName}</h2>
          <p>{itemType}</p>
        </div>
      </div>
      <div className={style.RewardValue}>
        <h3>R$ {itemValue}</h3>
      </div>
    </div>
  );
};

export default RewardItem;
