import style from '../roletta.module.css'
import RewardItem from './RewardItem';

const RewardsArray = () => {

  const items = [
    {
      type: 'Gold',
      itemImageUrl: '',
      itemImageAlt: '',
      itemName: 'Nome da Skin',
      itemType: 'Tipo de Skin',
      itemValue: '1000'
    },
    {
      type: 'Silver',
      itemImageUrl: '',
      itemImageAlt: '',
      itemName: 'Nome da Skin',
      itemType: 'Tipo de Skin',
      itemValue: '4000'
    },
    {
      type: 'Gold',
      itemImageUrl: '',
      itemImageAlt: '',
      itemName: 'Nome da Skin',
      itemType: 'Tipo de Skin',
      itemValue: '3000'
    },
    {
      type: 'Silver',
      itemImageUrl: '',
      itemImageAlt: '',
      itemName: 'Nome da Skin',
      itemType: 'Tipo de Skin',
      itemValue: '2000'
    },
    {
      type: 'Silver',
      itemImageUrl: '',
      itemImageAlt: '',
      itemName: 'Nome da Skin',
      itemType: 'Tipo de Skin',
      itemValue: '2000'
    },
    {
      type: 'Silver',
      itemImageUrl: '',
      itemImageAlt: '',
      itemName: 'Nome da Skin',
      itemType: 'Tipo de Skin',
      itemValue: '2000'
    },
    {
      type: 'Silver',
      itemImageUrl: '',
      itemImageAlt: '',
      itemName: 'Nome da Skin',
      itemType: 'Tipo de Skin',
      itemValue: '2000'
    },
  ]

  return (
    <div className={style.RewardsArray}>
      {items.map((item, index) => {
        if(index < 4) return <RewardItem key={index} props={item} />
      })}
    </div>
  );
}
 
export default RewardsArray;