import Image from "next/image";
import { useRouter } from "next/router";
import style from "./styles/pix.module.css";
import Pixcod from "@/images/Pix.png"
export default function Pix() {

    return (
        <>
            <div className={style.containerPix}>
                <Image src={Pixcod} alt="pix" width={180} height={180}></Image>
                <button className={style.buttonQrCode} onClick={()=>{alert("Codigo Copiado!")}}>Copiar QR code</button>
            </div>
        </>
    );
}