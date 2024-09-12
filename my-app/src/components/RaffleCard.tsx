import defaultGunPic from '../images/Roleta/Prizes/DefaultGunPic.png'
import shine from '../images/Roleta/WinnerPopup/shine.png'
import checkMark from '../assets/checkmark.svg'
import Image, { StaticImageData } from "next/image";
import { Dispatch, useEffect, useState } from 'react';
import { raffleItem } from 'utils/interfaces';

const RaffleCard = ({moreDetails, props}: { moreDetails: {setDetailsVisible: Dispatch<React.SetStateAction<boolean>>, setRaffleDetails: Dispatch<React.SetStateAction<number>>}, props: { raffle: raffleItem } }) => {

  const { setDetailsVisible, setRaffleDetails } = moreDetails
  const { raffle } = props
  const [ imgSrc, setImgSrc ] = useState<string | StaticImageData>(defaultGunPic)

  useEffect(() => {
    setImgSrc(raffle.bannerSkin)
  }, [raffle.id])

  const handleCardClick = () => {
    setDetailsVisible(true)
    setRaffleDetails(raffle.id)
  }

  return (
    <div className="card" onClick={() => handleCardClick()}>
      <Image className='skin' width={165} height={135} src={imgSrc} alt='Skin principal padrão' onError={error => {
        error.preventDefault()
        setImgSrc(defaultGunPic)
        }}/> 
      <Image className='shine' src={shine} alt='Skin principal'/>

      {raffle.isSelected && <div className="selectCheck">
        <Image src={checkMark} alt='check'/>
      </div>}

      <div className="glowGroup">
        <div className={`glow-1 ${raffle.bundleValue > 1000 ? 'Gold' : 'Silver'}`}></div>
        <div className={`glow-2 ${raffle.bundleValue > 1000 ? 'Gold' : 'Silver'}`}></div>
      </div>

      <h3 className={`${raffle.bundleValue > 1000 ? 'Gold' : 'Silver'}`}>{raffle.name}</h3>
    </div>
  );
}
 
export default RaffleCard;