import style from '../admin.module.css';
import Image from "next/image";

interface CardSkinsCartProps {
  id: string;
  name: string;
  value: number;
  picture: string;
  onRemove: (id: string) => void;
  onChangeOrder: (currentPosition: number, event: React.ChangeEvent<HTMLSelectElement>) => void;
  position: number;
  size: number;
}

const CardSkinsCart: React.FC<CardSkinsCartProps> = ({ id, name, value, picture, onRemove, onChangeOrder, position, size }) => {
  const options = size ? Array.from({ length: size }, (_, i) => i) : []

  const handleChangeOrder = (currentPosition: number, event: React.ChangeEvent<HTMLSelectElement>) => {
    onChangeOrder(currentPosition, event)
  }

  return (
    <div className={style.ContentCard}>
      <Image width={2000} height={2000} src={picture} alt={name} className={style.ImageCard} />
      <div className={style.DivDataCard}>
        <p>{name}</p>
        <p>R$: {value?.toFixed(2).replace('.', ',')}</p>
      </div>
      <div className={style.DivDeliteCard}>
        {typeof position === 'number' && <select onChange={(e) => handleChangeOrder(position, e)} value={position}>
            {options.map((option, index) => <option key={index} value={option}>{option}</option>)}
          </select>}
        <button onClick={() => onRemove(id)} className={style.RemoveButton}>x</button>
      </div>
    </div>
  );
}

export default CardSkinsCart;
