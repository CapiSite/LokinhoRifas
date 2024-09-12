import Image from "next/image";
import style from '../homepage.module.css';
import { ServicesCardType } from "utils/interfaces";

import Estrela from '../../assets/Estrela.svg'

const ServicesCard = ({ props }: { props: ServicesCardType }) => {
  if (!props) {
    return <div>Error: Cartas não carregaram!</div>;
  }

  const {
    ImageSVG = Estrela,
    ImageAlt = 'Service Image',
    CardTitle = 'Default Title',
    CardContent = 'Default content'
  } = props;

  return (
    <div className={style.Card}>
      <div className={style.CardWrapper}>
        <div className={style.ImageWrapper}>
          <Image src={ImageSVG} alt={ImageAlt} />
        </div>
        <h3>{CardTitle}</h3>
        <p>{CardContent}</p>
      </div>
    </div>
  );
};

export default ServicesCard;
  