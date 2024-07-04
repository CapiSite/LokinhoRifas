import Image from "next/image";
import style from '../../pages/homepage.module.css'

const ServicesCard = ({props}) => {
  const { ImageSVG, ImageAlt, CardTitle, CardContent } = props
  
  return (
    <div className={style.Card}>
      <div className={style.CardWrapper}>
        <div className={style.ImageWrapper}><Image src={ImageSVG} alt={ImageAlt} /></div>

        <h3>{CardTitle}</h3>
        <p>{CardContent}</p>
      </div>
    </div>
  );
}
 
export default ServicesCard;