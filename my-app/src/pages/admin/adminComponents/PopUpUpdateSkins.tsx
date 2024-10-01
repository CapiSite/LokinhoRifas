import { skinDataType } from "utils/interfaces";
import style from "../admin.module.css";
import { useState } from 'react';
import axios from 'axios';
import Image from "next/image";

export default function PopUpUpdateSkins({ setPopUpSkins, name, type, picture, id, value, reloadSkins }: any) {
    const [image, setImage] = useState(`${process.env.NEXT_PUBLIC_REACT_NEXT_APP}/uploads/${picture}`);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [skin, setSkin] = useState<skinDataType>({
        name: name,
        value: value,
        type: type,
        picture: picture
    });
    const [typeSkins, setTypeSkins] = useState([
        { name: "Adagas Sombrias" },
        { name: "AK-47" },
        { name: "AUG" },
        { name: "AWP" },
        { name: "Baioneta" },
        { name: "Baioneta M9" },
        { name: "Berettas Duplas" },
        { name: "Canivete" },
        { name: "Canivete Borboleta" },
        { name: "Canivete Falchion" },
        { name: "Cano Curto" },
        { name: "CZ75-Auto" },
        { name: "Desert Eagle" },
        { name: "Faca Bowie" },
        { name: "Faca Clássica" },
        { name: "Faca de Cordame" },
        { name: "Faca de Sobrevivência" },
        { name: "Faca do Caçador" },
        { name: "Faca Esqueleto" },
        { name: "Faca Gut Hook" },
        { name: "Faca Kukri" },
        { name: "Faca Navaja" },
        { name: "Faca Nômade" },
        { name: "Faca Stiletto" },
        { name: "Faca Talon" },
        { name: "Faca Ursus" },
        { name: "FAMAS" },
        { name: "Five-SeveN" },
        { name: "G3SG1" },
        { name: "Galil AR" },
        { name: "Glock-18" },
        { name: "Karambit" },
        { name: "M249" },
        { name: "M4A1-S" },
        { name: "M4A4" },
        { name: "MAC-10" },
        { name: "MAG-7" },
        { name: "MP5-SD" },
        { name: "MP7" },
        { name: "MP9" },
        { name: "Negev" },
        { name: "Nova" },
        { name: "P2000" },
        { name: "P250" },
        { name: "P90" },
        { name: "PP-Bizon" },
        { name: "Revolver R8" },
        { name: "SCAR-20" },
        { name: "SG 553" },
        { name: "SSG 08" },
        { name: "Tec-9" },
        { name: "UMP-45" },
        { name: "USP-S" },
        { name: "XM1014" },
        { name: "Zeus x27" },
        { name: "Broche" },
        { name: "Agente" },
        { name: "Adesivo" }
      ]);
    const [error, setError] = useState('');

    const handleImageChange = (event: any) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e: any) => {
                setImage(e.target.result);
            };
            reader.readAsDataURL(file);
            setSelectedFile(file);
        }
    };

    const handleValueChange = (e: any) => {
        let value = e.target.value.replace(/\D/g, ''); 
        value = (Number(value) / 100).toFixed(2); 
        value = value.replace(".", ","); 
       
        value = value.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
        
        setSkin((prevState: any) => ({
            ...prevState,
            value: `R$ ${value}`,
        }));
    };

    function convertToFloat(value: string) {
        let numericValue = value.replace(/[R$\s.]/g, '').replace(',', '.');
    
        let floatValue = Number(parseFloat(numericValue).toFixed(2));
    
        return floatValue;
    }

    const validateForm = () => {
        if (!skin.name) {
            setError("O nome da skin é obrigatório.");
            return false;
        }
        if (!skin.type) {
            setError("O tipo da skin é obrigatório.");
            return false;
        }
        if (Number(convertToFloat(String(skin.value))) <= 0) {
            setError("O valor da skin deve ser maior que zero.");
            return false;
        }
        return true;
    };

    const sendForm = async (e:any) => {
        e.preventDefault();

        setError("");
        if (!validateForm()) return;

        const formData = new FormData();
        const pictureFile = selectedFile;

        const skinData = { ...skin };
        skinData.value = convertToFloat(String(skin.value));

        if (!pictureFile) {
            skinData.picture = picture;
        } else {
            skinData.picture = pictureFile.name;
            formData.append("picture", pictureFile);
        }
        formData.append("skinData", JSON.stringify(skinData));
        const token = localStorage.getItem('token');
        try {
            await axios.put(
                `${process.env.NEXT_PUBLIC_REACT_NEXT_APP}/skin/${id}`,
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        Authorization: `Bearer ${token}`
                    },
                }
            );
            setPopUpSkins(false);
            reloadSkins();
            alert("Skin atualizada")
        } catch (error: any) {
            setError(error.response.data.message);
        }
    };

    return (
        <div className={style.ContainerPopUpUpdate}>
            <div className={style.ContentPopUpUpdate}>
                <div className={style.ButtonExitUpdate}>
                    <button onClick={() => setPopUpSkins(false)} className={style.ButtonExitUpdateStyle}>x</button>
                </div>
                <div className={style.DataPopUpUpdate}>

                    <div className={style.DivPhoto}>
                        <input type="file" className={style.fileInput} name="picture" onChange={handleImageChange} />
                        {image && <Image width={40} height={40} className={style.imagePreview} src={image} alt="Image Preview" />}
                    </div>

                    <div>
                        <h1 className={style.TitlePopUpUpdate}>Atualizar skin</h1>
                        <div className={style.DivInput}>
                            <label className={style.LabelPopUpUpdate}>Nome Da Skin:</label>
                            <input 
                                type='text' 
                                className={style.InputDataPopUp} 
                                name="name"
                                value={skin.name} 
                                onChange={(e) => setSkin({ ...skin, name: e.target.value })} 
                            />
                        </div>
                        <div className={style.DivInput}>
                            <label className={style.LabelPopUpUpdate}>Tipo:</label>
                            <select 
                                className={style.InputDataPopUp} 
                                name="type"
                                value={skin.type} 
                                onChange={(e) => setSkin({ ...skin, type: e.target.value })}
                            >
                                <option value="" className={style.dd}>Selecione um tipo</option>
                                {typeSkins.map((type, index) => (
                                    <option key={index} value={type.name}>
                                        {type.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className={style.DivInput}>
                            <label className={style.LabelPopUpUpdate} >Valor Da Skin:</label>
                            <input 
                                type='text' 
                                className={style.InputDataPopUp} 
                                name="value" 
                                placeholder='R$ 0,00'
                                value={skin.value} 
                                onChange={handleValueChange}
                            />
                        </div>
                        <button className={style.ButtonSavePopUp} onClick={sendForm}>Salvar</button>
                    </div>
                </div>
            </div>
        </div>
    );
};
