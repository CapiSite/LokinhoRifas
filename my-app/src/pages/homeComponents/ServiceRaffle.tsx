import cn from 'classnames'
import Image from 'next/image'
import style from '../homepage.module.css'

import BGRIFAS from '../../assets/bgRIFAS.svg'
import BGRIFASMOBILE from '../../assets/bgRIFASMobile.svg'
import BGFiller from '../../images/Homepage/ServicesRaffles/FundoDeVidro.png'
import ServicesRaffleGroup from './ServicesRaffleGroup'

//! Removido por causar problemas no fundo!
// import BackgroundImage from '../../images/Homepage/ServicesRaffles/ServicesRaffles.png'

const ServiceRaffle = () => {
  return (
    <section className={style.ServicesRaffles}>
      <div className={style.ServicesRafflesWrapper}>
        <h2>Grupo de Rifas!</h2>

        <ServicesRaffleGroup />
        {/* 1024 × 1227 */}
      </div>
      <div id='Grupos' className={style.background}>
        <Image height={750} width={2304} className={cn(style?.['background-0'], style?.['desktop'])} src={BGRIFAS} alt="Fundo da seção de Rifas" />
        <Image height={1227} width={1024} className={cn(style?.['background-0'], style?.['mobile'])} src={BGRIFASMOBILE} alt="Fundo da seção de Rifas" />
        <Image height={50} width={2304} className={cn(style?.['background-1'], style?.['desktop'])} src={BGFiller} alt="Fundo da seção de Rifas" />
        <Image height={50} width={2304} className={cn(style?.['background-2'], style?.['desktop'])} src={BGFiller} alt="Fundo da seção de Rifas" />
        {/* <Image height={50} src={BackgroundImage} alt="Fundo da seção de Rifas" className={cn(style?.['background-3'], style?.['desktop'])} /> */}
        {/* Removido por causar atritos no fundo!  */}
      </div>
    </section>
  );
}
 
export default ServiceRaffle;