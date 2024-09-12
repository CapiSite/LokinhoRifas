import Image, { StaticImageData } from "next/image";
import defaultGunPic from '../images/Roleta/Prizes/DefaultGunPic.png'
import shine from '../images/Roleta/WinnerPopup/shine.png'
import { ChangeEvent, useEffect, useState } from "react";
import { raffleItem } from "utils/interfaces";

const RaffleCartItem = ({props}: {props: { 
  item: raffleItem,
  handleChangeQuantity: Function,
  setUpdateQuantity: React.Dispatch<React.SetStateAction<boolean>>
} }) => {

  const { id, quantity, value, name, maxQuantity, skins, bannerSkin, bundleValue } = props.item
  const { handleChangeQuantity, setUpdateQuantity } = props

  const [ defaultValue, setDefaultValue ] = useState(quantity)

  const [ imgSrc, setImgSrc ] = useState<string | StaticImageData>(bannerSkin)

  useEffect(() => {
    setImgSrc(bannerSkin)
  }, [bannerSkin])

  useEffect(() => {
    handleChangeQuantity(id, defaultValue)
    setUpdateQuantity(prev => !prev)
  }, [defaultValue])

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    if(maxQuantity < Number(e.target.value)) return
    setDefaultValue(Number(e.target.value) == 0 ? 1 : Number(e.target.value))
  }

  const newValue = value.toString().includes('.') ? `${value.toString().split('.')[0]},${value.toString().split('.')[1][0]}${value.toString().split('.')[1][1] ? value.toString().split('.')[1][1] : '0'}` : `${value.toString()},00`

  return (
    <div className="cartItem">
      <div className="raffleBanner desktop">
        <div className="glowGroup">
        <div className={`glow-1 ${bundleValue > 1000 ? 'Gold' : 'Silver'}`}></div>
        <div className={`glow-2 ${bundleValue > 1000 ? 'Gold' : 'Silver'}`}></div>
        </div>
        <Image className='skin' width={165} height={135} src={imgSrc} alt='Skin principal' onError={() => setImgSrc(defaultGunPic)}/>
        <Image className="shine" src={shine} alt="Brilho"/>
      </div>

      <div className="raffleMetaData">
        <div className="raffleTitleContent">
          <h3>{name}</h3>
          <p>{skins.join(', ')}</p>
        </div>

        <div className="raffleQuantity">
          <label>
            <p>Qtd:</p> 
            <input min={1} onChange={e => handleInputChange(e)} type="number" name="quantidade"  value={defaultValue} required/>
          </label>

          <h3>x R$ {newValue}</h3>
        </div>
      </div>

      
    </div>
  );
}
 
export default RaffleCartItem;