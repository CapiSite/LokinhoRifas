import Image from 'next/image';
import ExternalSVG from '../../assets/ExternalLink.svg'
import Background from '../../images/Homepage/Hero/HERO.png'
import Faixas from './Faixa'
import style from '../../pages/homepage.module.css'

import cn from 'classnames'

const Hero = () => {
  return (
    <section className={style.Hero}>
      <div className={style.HeroWrapper}>
        <div className={style.ColGroup}>
          <div className={style.col1}>
          <h1>
            <span className={style.highlight}>Transforme</span> seu <br /> inventário com <br className={style.mobile} />o <span className={style.highlight}>Lokinho</span>
          </h1>
          <p>Fazemos upgrade, compra e venda. Precisa de uma skin especifica? Também fazemos encomendas</p>
          <button>Compre sua Rifa <Image src={ExternalSVG} alt="Link externo" /></button>
          </div>
          <div className={style.col2}></div>
        </div>
        
        <Faixas />
      </div>

      <div className={style.background}>
        <Image className={style?.['background-0']} src={Background} alt="Plano de fundo" />
        <div className={cn(style?.['background-1'], style.desktop)}></div>
        <div className={cn(style?.['background-2'], style.desktop)}></div>

      </div>
      <div className={style.GlowGroup}>
        <div className={style?.['glow-0']}>
        <div className={style?.['glow-1']}></div>
        </div>
      </div>
    </section>
  );
}

export default Hero;