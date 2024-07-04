import { useContext, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import style from "./styles/Admin.module.css";

import Background from "@/images/background.png";
import Post from "@/images/Post.png";
import axios from "axios";
import { TextContext } from "../../utils/contextText";
import TextContextType from "../../utils/interfaces";

type DropdownType = 'inserir' | 'atualizar' | 'deletar' | null;

export default function Admin() {
    const [visibleDropdown, setVisibleDropdown] = useState<DropdownType>(null);
    const [text, setText] = useState("")
    const {textInfo, setTextInfo} = useContext(TextContext) as TextContextType;
    const handleDropdown = (dropdown: DropdownType) => {
        if (visibleDropdown === dropdown) {
            setVisibleDropdown(null); // Fecha o dropdown se já estiver aberto
        } else {
            setVisibleDropdown(dropdown); // Abre o dropdown selecionado
        }
    };
    const trocarText = (text: string) => {
        const storedToken = localStorage.getItem("token");
        if (storedToken) {
        axios.post(process.env.NEXT_PUBLIC_REACT_NEXT_APP + "/text", {text}, {
          headers: {
            Authorization: `Bearer ${storedToken}`
          }
        }).then((res:any) => {
          setTextInfo(res.data.text);
          setText("")
        }).catch((err:any) => {
          console.error(err.response ? err.response.data : 'Erro ao buscar dados');
        });
      }
      }
    return (
        <>
            <Image src={Background} alt="Background do site" className={style.wallpaper} />
            <div className={style.Content}>
                <div className={style.Configs}>
                    <h1 className={style.Titles}>Configurar Skins</h1>
                    <button onClick={() => handleDropdown('inserir')}>Inserir Skin</button>
                    <button onClick={() => handleDropdown('atualizar')}>Atualizar Skin</button>
                    <button onClick={() => handleDropdown('deletar')}>Deletar Skin</button>
                </div>
                {visibleDropdown && (
                    <motion.div
                        key={visibleDropdown} // Importante para que o framer-motion saiba que houve uma mudança de dropdown
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                        className={style.Dropdown}
                    >
                        {visibleDropdown === 'inserir' && (
                            <div>
                                <h2 className={style.TituloConfig}>INSERIR SKIN</h2>
                                <form action="" method="get" className={style.Form}>
                                    <div>
                                        <label htmlFor="inome">Insira o nome da skin: </label>
                                        <input type="text" name="nome" id="inome" />
                                    </div>

                                    <div>
                                        <label htmlFor="ivalor">Insira o valor da skin: </label>
                                        <input type="text" name="valor" id="ivalor" />
                                    </div>

                                    <div>
                                        <label htmlFor="ifoto">Insira a foto da skin: </label>
                                        <input type="file" name="foto" id="ifoto" />
                                    </div>
                                </form>
                                <button type="submit" className={style.Confirmar}>CONFIRMAR</button>
                            </div>
                        )}
                        {visibleDropdown === 'atualizar' && (
                            <div>
                                <h2 className={style.TituloConfig}>ATUALIZAR SKIN</h2>
                                <h3>Selecione a Skin a ser atualizada: </h3>
                                <p>*LISTA DAS SKINS*</p>
                                <form action="" method="get" className={style.Form}>
                                    <div>
                                        <label htmlFor="inome">Insira o novo nome da skin: </label>
                                        <input type="text" name="nome" id="inome" />
                                    </div>

                                    <div>
                                        <label htmlFor="ivalor">Insira o novo valor da skin: </label>
                                        <input type="text" name="valor" id="ivalor" />
                                    </div>

                                    <div>
                                        <label htmlFor="ifoto">Insira a nova foto da skin: </label>
                                        <input type="file" name="foto" id="ifoto" />
                                    </div>
                                </form>
                                <button type="submit" className={style.Confirmar}>CONFIRMAR</button>
                            </div>
                        )}
                        {visibleDropdown === 'deletar' && (
                            <div>
                                <h2 className={style.TituloConfig}>DELETAR SKIN</h2>
                                <p>Selecione a Skin a ser excluída: </p>
                                <p>*LISTA DAS SKINS*</p>
                            </div>
                        )}
                    </motion.div>
                )}

                <div className={style.Configs}>
                    <h1 className={style.Titles}>Configurar Rifas</h1>
                    {/* Adicione aqui os botões e dropdowns para configurar rifas */}
                </div>
                {/* Adicione aqui o conteúdo condicional dos dropdowns para configurar rifas, se necessário */}

                <div className={style.Configs}>
                    <h1 className={style.Titles}>Alterar texto da Live</h1>
                    <input onChange={(e)=>setText(e.target.value)} value={text} className={style.changeText}/>
                    <button onClick={() => trocarText(text)}>Trocar Texto</button>
                    {/* Adicione aqui os botões e dropdowns para alterar texto da live */}
                </div>
                {/* Adicione aqui o conteúdo condicional dos dropdowns para alterar texto da live, se necessário */}
            </div>
        </>
    );
}