import ExternalLink from '../../assets/ExternalLink.svg'
import BGRifaOuro from '../../assets/bgRifaOuro.svg'
import ImagemRifaOuro from '../../images/Homepage/ServicesRaffles/imagemRifaOuro.png'
import BGRifaPrata from '../../assets/bgRifaPrata.svg'
import ImagemRifaPrata from '../../images/Homepage/ServicesRaffles/imagemRifaPrata.png'

import cn from 'classnames'
import Image from 'next/image'
import style from '../../pages/homepage.module.css'

import BGRIFAS from '../../assets/bgRIFAS.svg'
import BGRIFASTABLET from '../../assets/bgRIFASTablet.svg'
import BGRIFASMOBILE from '../../assets/bgRIFASMobile.svg'
import BGFiller from '../../images/Homepage/ServicesRaffles/FundoDeVidro.png'
import BackgroundImage from '../../images/Homepage/ServicesRaffles/ServicesRaffles.png'

const ServiceRaffle = () => {
  return (
    <section className={style.ServicesRaffles}>
      <div className={style.ServicesRafflesWrapper}>
        <h2>Grupo de Rifas!</h2>

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
              <p>Entre no nosso grupo de RIFAS GOLDEN e teremos prazer em recebê-lo, aqui você vai encontrar as mais diversas skins sendo rifadas do CSGO. Rifas com skins de preços medianos a altos com floats baixíssimo e promoções diferenciadas.</p>
              <a target='_blank' href="https://chat.whatsapp.com/I6z9eUyNp33EpLAxLWmOId"><button><Image src={ExternalLink} alt="" />Entrar</button></a>
            </div>
          </div>
        </div>
      </div>
      <div className={style.background}>
        <Image className={cn(style?.['background-0'], style?.['desktop'])} src={BGRIFAS} alt="Fundo da seção de Rifas" />
        <Image className={cn(style?.['background-0'], style?.['tablet'])} src={BGRIFASTABLET} alt="Fundo da seção de Rifas" />
        <Image className={cn(style?.['background-0'], style?.['mobile'])} src={BGRIFASMOBILE} alt="Fundo da seção de Rifas" />
        <Image className={cn(style?.['background-1'], style?.['desktop'])} src={BGFiller} alt="Fundo da seção de Rifas" />
        <Image className={cn(style?.['background-2'], style?.['desktop'])} src={BGFiller} alt="Fundo da seção de Rifas" />
        <Image src={BackgroundImage} alt="Fundo da seção de Rifas" className={cn(style?.['background-3'], style?.['desktop'])} />
      </div>
    </section>
  );
}
 
export default ServiceRaffle;