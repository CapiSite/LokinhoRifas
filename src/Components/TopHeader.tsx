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
          <div className="w-8 h-8 bg-use-red rounded-full flex items-center justify-center mb-12 mr-3">
            <FaFacebookF className="text-white bg-use-red text-xl " />
          </div>
          <div className="w-8 h-8 bg-use-red rounded-full flex items-center justify-center mb-12 mr-3">
            <BsInstagram className="text-white bg-use-red text-xl" />
          </div>
          <div className="w-8 h-8 bg-use-red rounded-full flex items-center justify-center mb-12 mr-20">
            <BsWhatsapp className="text-white bg-use-red text-xl" />
          </div>
        </div>
      </div>
    </>
  );
}