import { BsWhatsapp, BsInstagram } from "react-icons/bs";
import { FaFacebookF } from "react-icons/fa";
import style from "@/styles/TopHeader.module.css"
import Link from "next/link";
export default function TopHeader() {
  return (
    <>
      <div className={style.background}>
        <div className={style.left}>
          <p className={style.email}>
            LOKINHORIFAS@GMAIL.COM
          </p>
        </div>
        
        <div className={style.line}></div>
        <div className={style.right}>
          <div className={style.icon_div}>
            <FaFacebookF className={style.icon_text} />
          </div>
          <div className={style.icon_div}>
          <Link href="https://www.instagram.com/lokinhoskins/" target="_blank">
              <BsInstagram className={style.icon_text} />
          </Link>
          </div>
          
          <div className={style.icon_div}>
            <Link href="https://api.whatsapp.com/send?phone=5586981088012&text=Ol%C3%A1%20tudo%20bem?%20Estou%20entrando%20em%20contato%20atrav%C3%A9s%20do%20site%20e%20gostaria%20de%20tirar%20umas%20d%C3%BAvidas!" target="_blank">
            <BsWhatsapp className={style.icon_text} />
            </Link>
          </div>
        </div>
      </div>

      <div className={style.background2}>
        <div className={style.left}>
        <div className={style.icon_div}>
            <FaFacebookF className={style.icon_text} />
          </div>
          <div className={style.icon_div}>
            <BsInstagram className={style.icon_text} />
          </div>
          <div className={style.icon_div}>
            <BsWhatsapp className={style.icon_text} />
          </div>
        </div>
        
        <div className={style.line}></div>
        <div className={style.right}>
        <p className={style.email}>
            LOKINHORIFAS@GMAIL.COM
          </p>
          
        </div>
      </div>
    </>
  );
}