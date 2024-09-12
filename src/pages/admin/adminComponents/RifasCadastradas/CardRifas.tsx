import { useState } from "react";
import style from "./RifasCadastradas.module.css";
import PopUpRifa from "./PopUpRifa";
import Image from 'next/image';
import imagem from "../../../../images/Logo.png";

export default function CardRifas({ rifa }: any) {
    const [popUpRifa, setPopUpRifaRifa] = useState(false);

    return (
        <>
            {popUpRifa && (
                <PopUpRifa
                    setPopUpRifaRifa={setPopUpRifaRifa}
                    id={rifa?.id}
                    users_quantity={rifa?.users_quantity}
                    value={rifa?.value}
                    participants={rifa?.participants}
                    createdAt={rifa?.createdAt}
                    free={rifa?.free}
                    is_active={rifa?.is_active}
                    name={rifa?.name}
                    raffleSkins={rifa?.raffleSkins}
                    updatedAt={rifa?.updatedAt}
                />
            )}
            <div className={style.ContainerCardRifa} onClick={() => setPopUpRifaRifa(true)}>
                <Image src={imagem} width={180} height={100} alt="Card rifa" />
                <div className={style.NomeRifa}>
                    <p className={style.TitleRaffle}>{rifa?.name}</p>
                </div>
                <div className={style.DivType}>
                    <p>{rifa?.is_active || "Erro no status"}</p> 
                </div>
            </div>
        </>
    );
}
