import Image from 'next/image';
import Background from '../../images/Homepage/Hero/HERO.png';
import Faixas from './Faixa';
import style from '../homepage.module.css';
import { useContext } from 'react';
import { UserContext } from 'contexts/UserContext';
import { useRouter } from 'next/router';
import { UserContextType } from 'utils/interfaces';

const Hero = () => {
  const router = useRouter();
  const { userInfo, setShowRafflePopup } = useContext(UserContext) as UserContextType;

  const handleShowRaffles = () => {
    if (userInfo.token !== '') {
      setShowRafflePopup(true);
    } else {
      router.push('/login');
    }
  }

  return (
    <section id='Home' className={style.Hero}>
      <div className={style.HeroWrapper}>
        <div className={style.ColGroup}>
          <div className={style.col1}>
            <h1>
              <span className={style.highlight}>Transforme</span> seu <br /> inventário com <br className={style.mobile} />o <span className={style.highlight}>Lokinho</span>
            </h1>
            <p>Fazemos upgrade, compra e venda. Precisa de uma skin específica? Também fazemos encomendas</p>
            <button onClick={handleShowRaffles}>Compre sua Rifa</button>
          </div>
          <div className={style.col2}></div>
        </div>
        <Faixas />
      </div>
      <div className={style.background}>
        <Image width={2304} className={style?.['background-0']} src={Background} alt="Plano de fundo" />
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
