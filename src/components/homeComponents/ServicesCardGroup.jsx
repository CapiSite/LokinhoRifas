import Estrela from '../../assets/Estrela.svg'
import LogoTwitch from '../../assets/TwitchLogo.svg'
import IconeColaboração from '../../assets/ColaboraçãoIcone.svg'
import ServicesCard from './ServicesCard';
import style from '../../pages/homepage.module.css'

const ServicesCardGroup = () => {

  const cardList = [
    {ImageSVG: Estrela, ImageAlt: "Sorteios Diários", CardTitle: "Sorteios Diários", CardContent: "Realizamos rifas de skins - Facas, luvas, armas, agentes e adesivos. Sempre após ao terminar uma começamos outra, com facilidades para participar e com valores diversos que cabem no seu bolso."},
    {ImageSVG: IconeColaboração, ImageAlt: "Nossos Grupos", CardTitle: "NOSSOS GRUPOS", CardContent: "Nossos grupos de rifas - Compra e venda possuem administradores e moderadores de alta confiança no mercado de skins. Negociações 100% seguras. Temos sorteios gratuitos de skins e muitas promoções."},
    {ImageSVG: LogoTwitch, ImageAlt: "Lives na Twitch", CardTitle: "LIVES NA TWITCH", CardContent: "Transmitimos nossos sorteios sempre ao vivo na twitch ou instagram. Utilizando a plataforma WheelOfNames."}
  ]

  return (
    <div className={style.CardGroup}>
      {cardList.map((card, index) => <ServicesCard key={index} props={card}/>)}
    </div>
  );
}
 
export default ServicesCardGroup;