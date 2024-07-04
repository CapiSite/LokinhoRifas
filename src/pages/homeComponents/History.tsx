import Image from 'next/image';
import Retrato from '../../images/Homepage/History/THIAGO\ 1.png'
import style from '../../pages/homepage.module.css'

const History = () => {
  return (
    <section className={style.History}>
        <div className={style.HistoryWrapper}>
          <div className={style.col1}></div>
          <div className={style.col2}>
            <h2>Quem é Thiago Cordeiro?</h2>
            <p>Conhecido como Lokinho, é um empreendedor determinado e apaixonado pelo universo das skins do Counter-Strike. Com uma experiência desde 2017 no jogo e adentrando no mercado de vendas em 2019, Thiago tem se destacado na construção de um sólido negócio centrado na comercialização e rifas de skins. Sua dedicação e visão estratégica têm sido fundamentais para o crescimento contínuo de sua empreitada. Agradeço pela oportunidade de compartilhar minha experiência e seja muito bem-vindo a esta jornada de sucesso."</p>
          </div>
        </div>

        <div className={style.background}>
          <Image className={style?.['background-0']} src={Retrato} alt="Imagem do Thiago" />
        </div>
        <div className={style.GlowGroup}>
        <div className={style?.['glow-0']}></div>
        <div className={style?.['glow-1']}></div>
      </div>
      </section>
  );
}
 
export default History;