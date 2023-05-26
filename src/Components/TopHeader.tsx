import { BsWhatsapp, BsInstagram } from "react-icons/bs";
import { FaFacebookF } from "react-icons/fa";
import style from "@/styles/TopHeader.module.css"
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
            <BsInstagram className={style.icon_text} />
          </div>
          <div className={style.icon_div}>
            <BsWhatsapp className={style.icon_text} />
          </div>
        </div>
      </div>
    </>
  );
}