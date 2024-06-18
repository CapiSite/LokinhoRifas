import React from 'react';
import MaskedInput from 'react-text-mask';
import style from "./styles/creditCard.module.css";

export default function CreditCard() {
    return (
        <>
            <div className={style.containerCreditCard}>
                <div className={style.conteinerInputs}>
                    <label className={style.labelCreditCard}>Nome do cartão</label>
                    <input type="text" name="name" className={style.inputCreditCard} />
                </div>
                <div className={style.conteinerInputs}>
                    <label className={style.labelCreditCard}>Número do cartão</label>
                    <MaskedInput
                        mask={[/\d/, /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, /\d/]}
                        guide={false}
                        placeholder="0000 0000 0000 0000"
                        className={style.inputCreditCard}
                    />
                </div>
                <div className={style.divDataCvv}>
                    <div className={style.conteinerInputs}>
                        <label className={style.labelCreditCard}>Data do cartão</label>
                        <MaskedInput
                            mask={[/\d/, /\d/, '/', /\d/, /\d/]}
                            guide={false}
                            placeholder="MM/AA"
                            className={style.inputCreditCard}
                        />
                    </div>
                    <div className={style.conteinerInputs}>
                        <label className={style.labelCreditCard}>CVV</label>
                        <MaskedInput
                            mask={[/\d/, /\d/, /\d/]}
                            guide={false}
                            placeholder="CVV"
                            className={style.inputCreditCard}
                        />
                    </div>
                </div>
            </div>
        </>
    );
}
