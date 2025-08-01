import Colaboração from '../../assets/grupo.svg'
import Moeda from '../../assets/moeda.svg'
import Relogio from '../../assets/relogio.svg'
import Estrela from '../../assets/estrela2.svg'

// import Background from '../../images/Homepage/ServicesDisplay/Services.png'
// import Background2 from '../../images/Homepage/ServicesDisplay/ServicesBackground.png'

import NewBackground from '../../images/Homepage/ServicesDisplay/backgroundScene.png'
import NewBackground2 from '../../images/Homepage/ServicesDisplay/MockupCelular.png'

import BackgroundLines from '../../images/Homepage/ServicesDisplay/Services-1.png'
import Image from 'next/image'
import style from '../homepage.module.css'

const ServicesDisplay = () => {
  return (
    
    <section className={style.ServicesDisplay}>
    <div className={style.ServicesDisplayWrapper}>
      <div className={style.col1}>
        <Image height={540} width={920} className={style?.['background-1']} src={NewBackground} alt="Plano de fundo" />
        <Image height={680} width={725} className={style?.['background-0']} src={NewBackground2} alt="Mockup de celular" />
      </div>
      <div className={style.col2}>
        <ul>
          <li>
            <h3>
              <Image height={50} width={50} src={Colaboração} alt="Grupo de Rifas" />
              Compramos suas Skins
            </h3>
            <p>As melhores Rifas de CS2, entre e ganhe!</p>
          </li>
          <li>
            <h3>
              <Image height={50} width={50} src={Moeda} alt="Compramos suas Skins" />
              Prêmios diários
            </h3>
            <p>Pagamento imediato via pix, rápido e seguro!</p>
          </li>
          <li>
            <h3>
              <Image height={50} width={50} src={Relogio} alt="Encomende suas Skins" />
              Encomende suas Skins
            </h3>
            <p>Fazemos encomendas para sua skin.</p>
          </li>
          <li>
            <h3>
              <Image height={50} width={50} src={Estrela} alt="Grupo de Rifas" />
              Faça Upgrade de suas Skins
            </h3>
            <p>Melhoramos suas skins.</p>
          </li>
        </ul>
      </div>
    </div>
    <Image height={50} width={2304} className={style?.['background-2']} src={BackgroundLines} alt="Linhas de fundo" />

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