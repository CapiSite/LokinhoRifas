import Image from "next/image";
import { useRouter } from "next/router";
import style from "./styles/Admin.module.css";

import Background from "@/images/background.png";
import Post from "@/images/Post.png";

export default function Admin() {

    return (
        <>

            <Image src={Background} alt="Background do site" className={style.wallpaper} />
            <div className={style.Content}>
                <div className={style.Configs}>
                    <h1 className={style.Titles}>Configurar Skins</h1>
                    <button>Inserir Skin</button>
                    <button>Atualizar Skin</button>
                    <button>Deletar Skin</button>
                </div>

                <div className={style.Configs}>
                    <h1 className={style.Titles}>Configurar Rifas</h1>
                </div>

                <div className={style.Configs}>
                    <h1 className={style.Titles}>Alterar texto da Live</h1>
                </div>
            </div>

        </>
    );
}