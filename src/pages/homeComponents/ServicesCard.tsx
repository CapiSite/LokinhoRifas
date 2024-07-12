import Image from "next/image";
import style from '../../pages/homepage.module.css';
import { ServicesCardType } from "utils/interfaces";

const ServicesCard = ({ props }: { props: ServicesCardType }) => {
  if (!props) {
    return <div>Error: No props provided</div>;
  }

  const {
    ImageSVG = '/default.svg', // Default image
    ImageAlt = 'Service Image', // Default alt text
    CardTitle = 'Default Title', // Default title
    CardContent = 'Default content' // Default content
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
  