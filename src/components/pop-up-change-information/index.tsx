import Image from "next/image";
import { useRouter } from "next/router";
import style from "./styles/PopUpChangeInformation.module.css";
export default function PopUpChangeInformation({ setPopUp }:any) {

    return (
        <>
            <div className= {style.containerPopUpBuy}>
                <div className ={style.ContentPopUpBuy}>
                    <button onClick={()=>setPopUp(false)} className={style.buttonExit}>x</button>
                    <label>Novo TradLink:</label>
                    <input type="text"></input>
                    <label>Numero de celular:</label>
                    <input type="text"></input>
                    <label>Senha antiga:</label>
                    <input type="text"></input>
                    <label>Nova senha:</label>
                    <input type="text"></input>
                </div>
            </div>
        </>
    );
}