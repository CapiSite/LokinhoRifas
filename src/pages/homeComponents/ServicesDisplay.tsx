import Colaboração from '../../assets/grupo.svg'
import Moeda from '../../assets/moeda.svg'
import Relogio from '../../assets/relogio.svg'
import Estrela from '../../assets/estrela2.svg'

import Background from '../../images/Homepage/ServicesDisplay/Services.png'
import Background2 from '../../images/Homepage/ServicesDisplay/ServicesBackground.png'
import BackgroundLines from '../../images/Homepage/ServicesDisplay/Services-1.png'
import Image from 'next/image'
import style from '../../pages/homepage.module.css'

const ServicesDisplay = () => {
  return (
    
    <section className={style.ServicesDisplay}>
    <div className={style.ServicesDisplayWrapper}>
      <div className={style.col1}></div>
      <div className={style.col2}>
        <ul>
          <li>
            <div className={style.ImageBox}>
              <Image src={Colaboração} alt="Grupo de Rifas" />
            </div>
            <div className={style.lineContent}>
              <h3>Grupo de Rifas</h3>
              <p>As melhores Rifas de CSGO, Entre e ganhe!</p>
            </div>
          </li>
          <li>
            <div className={style.ImageBox}>
              <Image src={Moeda} alt="Compramos suas Skins" />
            </div>
            <div className={style.lineContent}>
              <h3>Compramos suas Skins</h3>
              <p>Pagamento imediato via pix, rápido e seguro!</p>
            </div>
          </li>
          <li>
            <div className={style.ImageBox}>
              <Image src={Relogio} alt="Encomende suas Skins" />
            </div>
            <div className={style.lineContent}>
              <h3>Encomende suas Skins</h3>
              <p>Fazemos encomendas para sua skin.</p>
            </div>
          </li>
          <li>
            <div className={style.ImageBox}>
              <Image src={Estrela} alt="Grupo de Rifas" />
            </div>
            <div className={style.lineContent}>
              <h3>Faça Upgrade de suas Skins</h3>
              <p>Melhoramos suas skins.</p>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <Image className={style?.['background-0']} src={Background} alt="Plano de fundo" />
    <Image className={style?.['background-1']} src={Background2} alt="Plano de fundo" />
    <Image className={style?.['background-2']} src={BackgroundLines} alt="Plano de fundo" />

    <div className={style.GlowGroup}>
      <div className={style?.['glow-0']}>
      <div className={style?.['glow-1']}></div>
      </div>
      <div className={style?.['glow-2']}></div>
    </div>
  </section>
  );
}
 
export default ServicesDisplay;