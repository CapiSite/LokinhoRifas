import { ChangeEvent, useState } from 'react';
import style from '../admin.module.css';
import CardSkinsCart from './CardSkinsCart';
import { RegisterRaffleProps, RegisterRifa } from 'utils/interfaces';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

const RegisterRaffle: React.FC<RegisterRaffleProps> = ({ skinsCard, setSkinsCard }) => {
  const [raffleName, setRaffleName] = useState('');
  const [numberOfTickets, setNumberOfTickets] = useState(1);
  const [raffleType, setRaffleType] = useState(false);

  const calculateTotalPrice = () => {
    return skinsCard?.reduce((total, skin) => total + skin.value, 0).toFixed(2).replace('.', ',');
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const token = localStorage.getItem('token')
      const response = await axios.post(`${process.env.NEXT_PUBLIC_REACT_NEXT_APP}/raffle`, {
        name: raffleName,
        users_quantity: numberOfTickets,
        skins: skinsCard.map(skin => ({ id: skin.itemId, position: skin.position })),
        free: raffleType // Adiciona o tipo de rifa no envio
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setRaffleName('');
      setNumberOfTickets(1);
      setSkinsCard([]);
    } catch (error) {
      console.error('Error creating raffle:', error);
    }
  };

  const handleRemoveSkin = (id: string) => {
    setSkinsCard(prevSkins => prevSkins.filter(skin => skin.id !== id).map((item, index) => ({...item, position: index})));
  };

  const handleChangeOrder = (currentPosition: number, event: ChangeEvent<HTMLSelectElement>) => {
    const selectedItem = skinsCard.filter(item => item.position == currentPosition)[0]

    const skinsArray = skinsCard.filter(item => item.position != currentPosition)

    skinsArray.splice(Number(event.target.value), 0, {...selectedItem, position: Number(event.target.value)})

    const finalSkinsArray = skinsArray.map((item, index) => ({...item, position: index}))

    setSkinsCard(finalSkinsArray)
  }

  return (
    <form className={style.CadastrarRifa} onSubmit={handleSubmit}>
      <div className={style.RegisterRifa}>
        <h1 className={style.TitleRegisterRifa}>Cadastrar Rifas</h1>
        <div>
          <div className={style.DivInputRegisterRifa}>
            <label>Nome Da Rifa:</label>
            <input type='text' value={raffleName} name='raffleName' onChange={(e) => setRaffleName(e.target.value)} required placeholder='Digite o Nome da Rifa' />
          </div>
          <div className={style.DivInputRegisterRifa}>
            <label>Quantidade de Numeros:</label>
            <input type='number' value={numberOfTickets} max={1000} name='quantity' onChange={(e) => setNumberOfTickets(parseInt(e.target.value))} required />
          </div>
          <div className={style.DivInputRegisterRifa}>

            <div className={style.DivInputRegisterRifa}>
              <label>Rifa Free:</label>
              <select
                value={raffleType ? 'true' : 'false'} 
                onChange={(e) => setRaffleType(e.target.value === 'true')} 
                className={style.SelectRaffleType}
                name='type'
                required
              >
                <option value="false">Não</option>
                <option value="true">Sim</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className={style.RegisterSkins}>
        <h1 className={style.TitleRegisterRifa}>Skins selecionadas</h1>
        <div className={style.ContainerCardSkinsCart}>
          {skinsCard.map((skin) => (
            <CardSkinsCart
              key={uuidv4()}
              id={skin.id}
              name={skin.name}
              value={skin.value}
              position={skin.position}
              size={skinsCard.length}
              picture={`${process.env.NEXT_PUBLIC_REACT_NEXT_APP}/uploads/${skin.picture}`}
              onRemove={handleRemoveSkin}
              onChangeOrder={handleChangeOrder}
            />
          ))}
        </div>
        <div className={style.ButtonPrice}>
          <p className={style.Price}>R$: {calculateTotalPrice()}</p>
          <button className={style.ButtonRigisterRifa} type='submit'>Cadastrar</button>
        </div>
      </div>
    </form>
  );
}

export default RegisterRaffle;
