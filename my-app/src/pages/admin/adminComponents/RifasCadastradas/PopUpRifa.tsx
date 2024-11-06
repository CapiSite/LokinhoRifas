import { useEffect, useState } from "react";
import style from "./RifasCadastradas.module.css";
import axios from "axios";
import PopUpUpdateRifa from "./PopUpUpdateRifa";
import { Participant } from "utils/interfaces";

export default function PopUpRifa({
    setPopUpRifaRifa, 
    id, 
    users_quantity, 
    participants = [], 
    value, 
    createdAt, 
    updatedAt, 
    is_active, 
    name
}: any) {
    const [popUpUpdateRaffle, setPopUpUpdateRaffle] = useState(false)

    function ActiveRaflle() {
        axios.post(process.env.NEXT_PUBLIC_REACT_NEXT_APP + `/raffle/active?id=${id}`, {}, 
        {headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}})
        .then((res) => {
            alert("Rifa Ativada!")
            setPopUpRifaRifa(false)
        })
        .catch((err) => {
            console.log(err)
        })
    }

    function DeleteRifa() {
        axios.delete(process.env.NEXT_PUBLIC_REACT_NEXT_APP + `/raffle/remove-raffle/${id}`, 
        {headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}})
        .then((res) => {
            alert("Rifa Deletada!")
            setPopUpRifaRifa(false)
        })
        .catch((err) => {
            alert("Rifa não foi deletada!")
        })
    }

    const paidParticipants = participants.filter((participant: Participant) => participant.is_paid)

    return (
        <>
            {!popUpUpdateRaffle && (
                <div className={style.ContainerPopUpRifa}>
                    <div className={style.ContentPopUpRifa}>
                        <div className={style.ButtonExitUpdate}>
                            <button onClick={() => setPopUpRifaRifa(false)} className={style.ButtonExitUpdateStyle}>x</button>
                        </div>
                        <div className={style.HeaderPopUpRifa}>
                            <h2 className={style.NomeRifa}>{name}</h2>
                        </div>
                        <div className={style.BodyPopUpRifa}>
                            <p className={style.TitleDescriptionPopUpRifa}>Quantidade de Participantes: <span>{users_quantity || 0}</span></p>
                            <p className={style.TitleDescriptionPopUpRifa}>Limite de Participantes: <span>{paidParticipants?.length || 0}/{users_quantity}</span></p>
                            <p className={style.TitleDescriptionPopUpRifa}>Estado: <span className={style.EstateRaffle}>{is_active}</span></p>
                            <p className={style.TitleDescriptionPopUpRifa}>Valor Total: <span>R$: {value}</span> </p>
                            <p className={style.TitleDescriptionPopUpRifa}>Valor por Rifa: <span>R$: {(value / users_quantity)?.toFixed(2)}</span></p>
                            <p className={style.TitleDescriptionPopUpRifa}>Criado em: <span>{new Date(createdAt).toLocaleDateString()}</span></p>
                            <p className={style.TitleDescriptionPopUpRifa}>Modificada em: <span>{new Date(updatedAt).toLocaleDateString()}</span></p>
                        </div>
                        <div className={style.FooterPopUpRifa}>
                            <button 
                                className={style.ButtonPopUpRifa} 
                                onClick={() => ActiveRaflle()} 
                                disabled={is_active !== "Em espera"}>
                                Ativar Rifa
                            </button>
                            <button 
                                className={style.ButtonPopUpRifa} 
                                onClick={() => DeleteRifa()} 
                                disabled={(participants.length || 0) !== 0}>
                                Deletar Rifa
                            </button>
                            <button className={style.ButtonPopUpRifa} onClick={() => {
                                setPopUpUpdateRaffle(true);
                            }}>
                                Atualizar Rifa
                            </button>
                        </div>
                    </div>
                </div>
            )}
            {popUpUpdateRaffle && (
                <div className={style.Overlay}>
                    <PopUpUpdateRifa 
                        setPopUpUpdateRaffle={setPopUpUpdateRaffle} 
                        raffleId={id} 
                    />
                </div>
            )}
        </>
    );
}
