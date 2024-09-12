import style from '../admin.module.css';

interface CardSkinsCartProps {
  id: number;
  name: string;
  value: number;
  picture: string;
  onRemove: (id: number) => void;
}

const CardSkinsCart: React.FC<CardSkinsCartProps> = ({ id, name, value, picture, onRemove }) => {
  return (
    <div className={style.ContentCard}>
      <img src={picture} alt={name} className={style.ImageCard} />
      <div className={style.DivDataCard}>
        <p>{name}</p>
        <p>R$: {value?.toFixed(2).replace('.', ',')}</p>
      </div>
      <div className={style.DivDeliteCard}>
      <button onClick={() => onRemove(id)} className={style.RemoveButton}>x</button>
      </div>
    </div>
  );
}

export default CardSkinsCart;
