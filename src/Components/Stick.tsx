import style from "@/styles/Stick.module.css";
import Image from "next/image";
import element from "@/../public/element.png";
import Link from "next/link";

export default function Stick() {
  return (
    <>
      <div className={style.forLine}>
        <div className={style.background}>
          <div className={style.left}>
            <Image width={550} alt="Element" src={element} />
          </div>
          <div className={style.right}>
            <h1><span>TRANSFORME</span> SEU INVENTÁRIO COM O <span>LOKINHO</span></h1>
            <p>Fazemos upgrade, compra e venda. Precisa de uma skin específica? Também fazemos encomendas!</p>

            <button>
              <Link href="https://api.whatsapp.com/send?phone=5586981088012&text=Ol%C3%A1%20tudo%20bem?%20Estou%20entrando%20em%20contato%20atrav%C3%A9s%20do%20site%20e%20tenho%20interesse%20de%20compra/venda/upgrade%20de%20skins!" target="_blank">FAÇA SEU ORÇAMENTO
              </Link>
              </button>

          </div>
        </div>

      </div>
    </>
  );
}
