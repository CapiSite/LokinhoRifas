import style from "./styles/PopUpBuy.module.css";
import CreditCard from "../credit-card";
import Pix from "../pix";
import { useState } from 'react';

export default function PopUpBuy({ setPopUp }:any) {
    const [paymentMethod, setPaymentMethod] = useState("CreditCard");
    const [selectedNumbers, setSelectedNumbers] = useState<string[]>([]);

    const handlePaymentSelection = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPaymentMethod(event.target.value);
    };

    const handleNumberSelection = (event: React.ChangeEvent<HTMLSelectElement>) => {
        // Mapeando as opções selecionadas para seus valores e atualizando o estado
        const selectedOptions = Array.from(event.target.selectedOptions, option => option.value);
        setSelectedNumbers(selectedOptions);
    };

    return (
        <>
            <div className={style.containerPopUpBuy}>
                <div className={style.ContentPopUpBuy}>
                    <button onClick={() => setPopUp(false)} className={style.buttonExit}>x</button>
                    <div className={style.containerInputs}>
                        <div>
                            <div>
                                <p className={style.TitlePopUpBuy}>Compra de Rifas</p>
                                <p className={style.titlePopUp}>Escolha os números da Rifa:</p>
                                <select multiple className={style.inputselectnumber} value={selectedNumbers} onChange={handleNumberSelection}>
                                    {/* Substitua 1-10 pelo seu intervalo de números disponíveis */}
                                    {Array.from({ length: 20 }, (_, i) => <option key={i} value={String(i + 1)}>{i + 1}</option>)}
                                </select>
                            </div>
                            <div>
                                <p className={style.titlePopUp}>Método de pagamento</p>
                                <input type="radio" name="payment" value="CreditCard" onChange={handlePaymentSelection}/>
                                <label className={style.labelPopUp}>Cartão de crédito</label>
                                <input type="radio" name="payment" value="Pix" onChange={handlePaymentSelection} />
                                <label className={style.labelPopUp}>Pix</label>
                            </div>
                            {paymentMethod === "CreditCard" && <CreditCard />}
                            {paymentMethod === "Pix" && <Pix />}
                            <div className={style.divButton}>
                                <button onClick={() => setPopUp(false)} className={style.buttonPopUpBuy}>Cancelar</button>
                                <button className={style.buttonPopUpBuy}>Confirmar</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
