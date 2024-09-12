import axios from "axios";
import { useContext, useState } from "react";
import style from "../admin.module.css"
import { TextContextType } from "utils/interfaces";
import { TextContext } from "contexts/TextContext";


const ChangeTextLive = () => {
    const {textInfo, setTextInfo} = useContext(TextContext) as TextContextType;
    const trocarText = (text: string) => {
        const storedToken = localStorage.getItem("token");
        if (storedToken) {
            axios.post(process.env.NEXT_PUBLIC_REACT_NEXT_APP + "/text", { text }, {
                headers: {
                    Authorization: `Bearer ${storedToken}`
                }
            }).then((res: any) => {
                setTextInfo(res.data.text);
                setText("")
            }).catch((err: any) => {
                console.error(err.response ? err.response.data : 'Erro ao buscar dados');
            });
        }
    }

    const [text, setText] = useState("");

    return (
        <div>
            <div className={style.Configs}>
                <h1 className={style.TitlesRifa}>Alterar texto da Live</h1>
                <input onChange={(e) => setText(e.target.value)} value={text} className={style.changeText} />
                <button onClick={() => trocarText(text)} className={style.ButtonTextLive}>Trocar Texto</button> 
            </div>
        </div>
    )
}

export default ChangeTextLive;