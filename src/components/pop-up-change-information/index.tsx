import Image from "next/image";
import { useRouter } from "next/router";
import style from "./styles/PopUpChangeInformation.module.css";
import MaskedInput from "react-text-mask";

export default function PopUpChangeInformation({ setPopUpInfo }: any) {
    return (
        <>
            <div className={style.containerPopUpBuy}>
                <div className={style.ContentPopUpBuy}>
                    <button onClick={() => setPopUpInfo(false)} className={style.buttonExit}>x</button>
                    
                    <div className={style.containerInputsPopUpInfo}>
                    <p className={style.TitlePopUp}>Seus Dados</p>
                        <div className={style.InputsPopUpInfo}>
                            <label className={style.labelInputsPopUp}>Atualizar TradLink:</label>
                            <input type="text" className={style.inputsPopUp}></input>
                        </div>
                        <div className={style.InputsPopUpInfo}>
                            <label className={style.labelInputsPopUp}>Atualizar celular:</label>
                            <MaskedInput
                                mask={['(', /[1-9]/, /\d/, ')', ' ', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
                                className={style.inputsPopUp}
                                guide={false}
                                type="text"
                                keepCharPositions={true}
                            />
                        </div>
                        <div className={style.InputsPopUpInfo}>
                            <label className={style.labelInputsPopUp}>Senha antiga:</label>
                            <input type="password" className={style.inputsPopUp}></input>
                        </div>
                        <div className={style.InputsPopUpInfo}>
                            <label className={style.labelInputsPopUp}>Nova senha:</label>
                            <input type="password" className={style.inputsPopUp}></input>
                        </div>
                        <div style={{marginTop:"10px"}}>
                            <button className={style.buttonSavePopUp} type="submit">Atualizar</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
