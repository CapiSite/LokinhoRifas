import Image, { StaticImageData } from "next/image";
import defaultGunPic from '../images/Roleta/Prizes/DefaultGunPic.png';
import shine from '../images/Roleta/WinnerPopup/shine.png';
import { ChangeEvent, useEffect, useState } from "react";
import { raffleItem } from "utils/interfaces";

const RaffleCartItem = ({props}: {props: { 
  item: raffleItem,
  handleChangeQuantity: Function,
  setUpdateQuantity: React.Dispatch<React.SetStateAction<boolean>>
} }) => {

  const { id, quantity, value, name, maxQuantity, skins, bannerSkin, bundleValue, users_quantity } = props.item;
  const { handleChangeQuantity, setUpdateQuantity } = props;

  const [defaultValue, setDefaultValue] = useState<string>(quantity.toString());
  const [imgSrc, setImgSrc] = useState<string | StaticImageData>(defaultGunPic);

  useEffect(() => {
    if (bannerSkin.includes('default')) return;
    setImgSrc(bannerSkin);
  }, [bannerSkin]);

  useEffect(() => {
    handleChangeQuantity(id, Number(defaultValue) == 0 ? 1 : Math.ceil(Number(defaultValue)));
    setUpdateQuantity(prev => !prev);
  }, [defaultValue]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (maxQuantity < Number(e.target.value)) return setDefaultValue(maxQuantity.toString());
    if (Number(e.target.value) < 0) return setDefaultValue('0');
    setDefaultValue(e.target.value);
  };

  const newValue = value.toString().includes('.') 
    ? `${value.toString().split('.')[0]},${value.toString().split('.')[1][0]}${value.toString().split('.')[1][1] ? value.toString().split('.')[1][1] : '0'}` 
    : `${value.toString()},00`;

  return (
    <div className="cartItem">
      <div className="raffleBanner desktop">
        <div className="glowGroup">
          <div className={`glow-1 ${bundleValue > 1000 ? 'Gold' : 'Silver'}`}></div>
          <div className={`glow-2 ${bundleValue > 1000 ? 'Gold' : 'Silver'}`}></div>
        </div>
        <Image className='skin' width={165} height={135} src={imgSrc} alt='Skin principal' onError={() => setImgSrc(defaultGunPic)} />
        <Image className="shine" width={50} src={shine} alt="Brilho" />
      </div>

      <div className="raffleMetaData">
        <div className="raffleTitleContent">
          <h3>{name}</h3>
          <p>{skins.join(', ')}</p>
        </div>

        <div className="raffleQuantity">
          <label>
            <p>Qtd:</p> 
            <input 
              type="number" 
              onChange={e => handleInputChange(e)} 
              value={defaultValue} 
              name="quantidade" 
            />
          </label>

          {/* Exibe o número de participantes atuais (users_quantity) e o máximo que uma pessoa pode comprar (maxQuantity) */}
          

          <h3>x R$ {newValue}</h3>
        </div>
        <p className="currentQuantity">Rifas compradas: {users_quantity-maxQuantity}/{users_quantity}</p>

      </div>
    </div>
  );
};

export default RaffleCartItem;
