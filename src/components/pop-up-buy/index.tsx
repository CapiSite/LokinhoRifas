import Image from "next/image";
import { useRouter } from "next/router";
import style from "./styles/PopUpBuy.module.css";

export default function PopUpBuy({ setPopUp }: any) {

    return (
        <>
            <div className={style.containerPopUpBuy}>
                <div className={style.ContentPopUpBuy}>
                    <button onClick={() => setPopUp(false)} className={style.buttonExit}>x</button>
                    <div className={style.containerInputs}>
                        <p className={style.TitlePopUpBuy}>Compre Sua Rifa:</p>
                        <div>
                            <div>
                                <p>teste</p>
                            </div>
                            <div>
                                <p>teste</p>
                            </div>
                            <div>
                                <p>teste</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}