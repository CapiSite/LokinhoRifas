import ExternalLink from '../../assets/ExternalLink.svg'
import BGRifaOuro from '../../assets/bgRifaOuro.svg'
import ImagemRifaOuro from '../../images/Homepage/ServicesRaffles/imagemRifaOuro.png'
import BGRifaPrata from '../../assets/bgRifaPrata.svg'
import ImagemRifaPrata from '../../images/Homepage/ServicesRaffles/imagemRifaPrata.png'

import style from '../homepage.module.css'
import Image from 'next/image'

const ServicesRafflesGroup = () => {
  return (
    <div className={style.CardGroup}>
      <div className={style.Card}>

        <Image className={style.BackgroundRaffle} src={BGRifaPrata} alt="fundo da Rifa" />
        <Image className={style.RaffleLogo} src={ImagemRifaPrata} alt="Logo na rifa de ouro" />

        <div className={style.RaffleContent}>
          <h3>Grupo Silver</h3>
          <p>Entre no nosso grupo de RIFAS SILVER e teremos prazer em recebê-lo, aqui você vai encontrar as mais diversas skins sendo rifadas do CSGO. Rifas com skins de preços baixos a medianas.</p>
          <a target='_blank' href="https://chat.whatsapp.com/CXC6oVWoqy37bMUfiENeVx"><button><Image src={ExternalLink} alt="" />Entrar</button></a>
        </div>

      </div>

      <div className={style.Card}>

        <Image className={style.BackgroundRaffle} src={BGRifaOuro} alt="fundo da Rifa" />
        <Image className={style.RaffleLogo} src={ImagemRifaOuro} alt="Logo na rifa de ouro" />

        <div className={style.RaffleContent}>
          <h3>Grupo Gold</h3>
          <p>Entre no nosso grupo de RIFAS GOLDEN e teremos prazer em recebê-lo. Aqui temos rifas com skins de preços medianos a altos com floats baixíssimo e promoções diferenciadas.</p>
          <a target='_blank' href="https://chat.whatsapp.com/I6z9eUyNp33EpLAxLWmOId"><button><Image src={ExternalLink} alt="" />Entrar</button></a>
        </div>
      </div>
    </div>
  );
}
 
export default ServicesRafflesGroup;