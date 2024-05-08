import style from "../styles/Footer.module.css"
import Logo from "../images/Logo.png"
import ssl from "../images/ssl.png"

import Image from "next/image";
import { FaFacebookF } from "react-icons/fa";
import { BsInstagram, BsWhatsapp } from "react-icons/bs";
import Link from "next/link";
import router from "next/router";

export default function Footer() {
  return (
    <>
      <div className={style.background100}>
        <div className={style.left100}>
        <div>
            <h1>LOKINHO SKINS LTDA</h1>
            <div>
              <p>CNPJ: 50.278.011/0001-06</p>
              <button onClick={() => router.push("/privacy")} className={style.privacy}>Políticas de privacidade</button>
            </div>
          </div>
        </div>
        <div className={style.line100}></div>
        <div className={style.right100}>
        <div>
            <h1>CONTATOS:</h1>
            <p>LOKINHOSKINS@GMAIL.COM</p>
            <Link href="https://api.whatsapp.com/send?phone=5586981088012" target="_blank">
            <h2>(86) 98108-8012 - Compra e Venda</h2>
            </Link>
            <Link href="https://api.whatsapp.com/send?phone=5581998958653" target="_blank">
            <h2>(81) 99895-8653 - Rifas</h2>
            </Link>
          </div>

          <Image src={ssl} width={155} alt="Logo1" />
          <Image src={Logo} width={155} alt="Logo1" />
        </div>
      </div>
    </>
  );

}