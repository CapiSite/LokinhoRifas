import style from "@/styles/Footer.module.css"
import Logo from "@/../public/Logo.png"
import Image from "next/image";
import { FaFacebookF } from "react-icons/fa";
import { BsInstagram, BsWhatsapp } from "react-icons/bs";
import Link from "next/link";


export default function Footer() {
  return (
    <>
      <div className={style.background}>
        <div className={style.left}>
        <div>
            <h1>LOKINHO SKINS LTDA</h1>
            <div>
              <p>CNPJ: 50.278.011/0001-06</p>
              <p>Endereço Res São Domingos, quadra 02 - São Domingos </p>
              <p> Luzilândia, PI - 64160-000</p>
            </div>
          </div>
        </div>
        <div className={style.line}></div>
        <div className={style.right}>
        <div>
            <h1>CONTATOS:</h1>
            <p>LOKINHOSKINS@GMAIL.COM</p>
            <div className={style.socialMedia}>
              <div className={style.icon_div}>
                <FaFacebookF className={style.icon_text} />
              </div>
              <div className={style.icon_div}>
                <Link
                  href="https://www.instagram.com/lokinhoskins/"
                  target="_blank"
                >
                  <BsInstagram className={style.icon_text} />
                </Link>
              </div>

              <div className={style.icon_div}>
                <Link
                  href="https://api.whatsapp.com/send?phone=5586981088012&text=Ol%C3%A1%20tudo%20bem?%20Estou%20entrando%20em%20contato%20atrav%C3%A9s%20do%20site%20e%20gostaria%20de%20tirar%20umas%20d%C3%BAvidas!"
                  target="_blank"
                >
                  <BsWhatsapp className={style.icon_text} />
                </Link>
              </div>
            </div>
          </div>
          <div>

          </div>
          <Image src={Logo} width={155} alt="Logo1" />
        </div>
      </div>
    </>
  );

}
;