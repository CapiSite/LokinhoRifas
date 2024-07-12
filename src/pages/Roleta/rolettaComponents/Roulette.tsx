import style from '../roletta.module.css'
import RouletteArray from './RouletteArray';

const Roulette = () => {
  return (
    <div className={style.Roulette}>
      <RouletteArray />

      {/* TODO: Terminar o background da roleta */}
      <div className={style.background}>
        <div className={style.shadeLeft}></div>
        <div className={style.shadeRight}></div>

        <div className={style.pin}></div>
      </div>
    </div>
  );
}
 
export default Roulette;