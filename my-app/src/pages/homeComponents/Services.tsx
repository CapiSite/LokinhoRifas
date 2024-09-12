import ServicesCardGroup from "./ServicesCardGroup";
import style from '../homepage.module.css'

const Services = () => {

  return (
    <section id="Vantagens" className={style.Services}>
      <div className={style.ServicesWrapper}>
        <h2>Nossas <span className={style.highlight}>vantagens:</span></h2>
        <ServicesCardGroup />
      </div>
    </section>
  );
}
 
export default Services;