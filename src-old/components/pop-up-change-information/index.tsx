import React, { useState, useContext, useEffect } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import style from "./styles/PopUpChangeInformation.module.css";
import MaskedInput from "react-text-mask";
import { UserContext } from "../../utils/contextUser";
import UserContextType, { UserData } from "../../utils/interfaces";
import axios from "axios";
import { Phone } from "@mui/icons-material";

export default function PopUpChangeInformation({ setPopUpInfo }:any) {
    const { userInfo, setUserInfo } = useContext(UserContext) as UserContextType;
    const [userData, setUserData] = useState<any>({
        tradeLink: userInfo.tradeLink,
        phoneNumber: userInfo.phoneNumber,
        oldPassword: "",
        newPassword: "",
        picture: null
    });
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);
    const handleChange = (e:any) => {
        const { name, value } = e.target;
        if (name === "picture") {
            setUserData((prevState:any) => ({
                ...prevState,
                picture: e.target.files[0]
            }));
        } else {
            setUserData((prevState:any) => ({
                ...prevState,
                [name]: value
            }));
        }
    };

    const updateUser = async () => {
        const token = localStorage.getItem("token");
        const formData = new FormData();
        let signUpData:any = {
            tradeLink: userData.tradeLink,
            phoneNumber: userData.phoneNumber
        }
        
        // Criar signUpData sem os campos de senha
        if(userData.newPassword && userData.oldPassword){
            signUpData.newPassword = userData.newPassword;
            signUpData.oldPassword = userData.oldPassword
        }

    
        // Adicionar signUpData ao formData
        formData.append('signUpData', JSON.stringify(signUpData));
    
        // Adicionar a imagem se disponível
        if (userData.picture) {
            formData.append('picture', userData.picture);
        } else {
            formData.append('picture', "Default");
        }
        
        try {
            const response = await axios.put(`${process.env.NEXT_PUBLIC_REACT_NEXT_APP}/users/update/${userInfo.id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${token}`
                }
            });
            if (response.status === 200) {
                setSuccess(true);
                setUserInfo({ ...userInfo, ...signUpData });
                setPopUpInfo(false);
                
            } else {
                throw new Error('Erro ao atualizar os dados');
            }
        } catch (err: any) {
            setError(true);
            console.log(err.response.data);
        }
    };
    

    return (
        <>
            <div className={style.containerPopUpBuy}>
                <div className={style.ContentPopUpBuy}>
                    <button onClick={() => setPopUpInfo(false)} className={style.buttonExit}>x</button>
                    
                    <div className={style.containerInputsPopUpInfo}>
                        <p className={style.TitlePopUp}>Seus Dados</p>
                        <div className={style.InputsPopUpInfo}>
                            <label className={style.labelInputsPopUp}>Atualizar TradeLink:</label>
                            <input type="text" className={style.inputsPopUp} value={userData.tradeLink} onChange={handleChange} name="tradeLink" />
                        </div>
                        <div className={style.InputsPopUpInfo}>
                            <label className={style.labelInputsPopUp}>Atualizar celular:</label>
                            <MaskedInput
                                mask={['(', /[0-9]/, /\d/, ')', ' ', /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
                                className={style.inputsPopUp}
                                guide={false}
                                type="text"
                                value={userData.phoneNumber}
                                onChange={handleChange}
                                name="phoneNumber"
                                keepCharPositions={true}
                            />
                        </div>
                        <div className={style.InputsPopUpInfo}>
                            <label className={style.labelInputsPopUp}>Senha antiga:</label>
                            <input type="password" className={style.inputsPopUp} value={userData.oldPassword} onChange={handleChange} name="oldPassword" />
                        </div>
                        <div className={style.InputsPopUpInfo}>
                            <label className={style.labelInputsPopUp}>Nova senha:</label>
                            <input type="password" className={style.inputsPopUp} value={userData.newPassword} onChange={handleChange} name="newPassword" />
                        </div>
                        <div className={style.InputsPopUpInfo}>
                            <label className={style.labelInputsPopUp}>Atualizar foto:</label>
                            <input type="file" className={style.inputsPopUp} onChange={handleChange} name="picture" />
                        </div>
                        <div style={{marginTop: "10px"}}>
                            <button className={style.buttonSavePopUp} onClick={updateUser}>Atualizar</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
