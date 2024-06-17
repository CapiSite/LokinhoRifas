import { useState } from "react";
import Image from "next/image";
import style from "./styles/Admin.module.css";

import Background from "@/images/background.png";
import Post from "@/images/Post.png";

type DropdownType = 'inserir' | 'atualizar' | 'deletar' | null;

export default function Admin() {
    const [visibleDropdown, setVisibleDropdown] = useState<DropdownType>(null);

    const handleDropdown = (dropdown: DropdownType) => {
        setVisibleDropdown(visibleDropdown === dropdown ? null : dropdown);
    };

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
                    <div className={style.Dropdown}>
                        {visibleDropdown === 'inserir' && (
                            <div>
                                <h2>Inserir Skin</h2>
                                {/* Conteúdo do formulário para inserir skin */}
                                <p>Formulário para inserir skin</p>
                            </div>
                        )}
                        {visibleDropdown === 'atualizar' && (
                            <div>
                                <h2>Atualizar Skin</h2>
                                {/* Conteúdo do formulário para atualizar skin */}
                                <p>Formulário para atualizar skin</p>
                            </div>
                        )}
                        {visibleDropdown === 'deletar' && (
                            <div>
                                <h2>Deletar Skin</h2>
                                {/* Conteúdo do formulário para deletar skin */}
                                <p>Formulário para deletar skin</p>
                            </div>
                        )}
                    </div>
                )}

                <div className={style.Configs}>
                    <h1 className={style.Titles}>Configurar Rifas</h1>
                    {/* Adicione aqui os botões e dropdowns para configurar rifas */}
                </div>
                {/* Adicione aqui o conteúdo condicional dos dropdowns para configurar rifas, se necessário */}

                <div className={style.Configs}>
                    <h1 className={style.Titles}>Alterar texto da Live</h1>
                    {/* Adicione aqui os botões e dropdowns para alterar texto da live */}
                </div>
                {/* Adicione aqui o conteúdo condicional dos dropdowns para alterar texto da live, se necessário */}
            </div>
        </>
    );
}
