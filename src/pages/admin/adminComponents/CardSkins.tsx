import style from '../admin.module.css';
import Image from 'next/image';
import { IoSettingsSharp } from "react-icons/io5";
import { useState } from 'react';
import { AnimatePresence, motion } from "framer-motion";
import PopUpUpdateSkins from './PopUpUpdateSkins';
import { RegisterRifa } from 'utils/interfaces'; // Certifique-se de importar a interface correta
import { StaticImport } from 'next/dist/shared/lib/get-img-props';

export default function CardSkins({
    name,
    type,
    value,
    picture,
    id,
    onDelete,
    reloadSkins,
    skinsCard,
    setSkinsCard
}: {
    name: string;
    type: string;
    value: number;
    picture: string | StaticImport;
    id: number;
    onDelete: (id: number) => void;
    reloadSkins: () => void;
    skinsCard: RegisterRifa[]; // Tipo da lista de skins
    setSkinsCard: React.Dispatch<React.SetStateAction<RegisterRifa[]>>; // Tipo da função para atualizar a lista de skins
}) {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [popUpSkins, setPopUpSkins] = useState(false);

    // Função para adicionar a skin na rifa
    const handleAddToRaffle = () => {
        const newSkin: RegisterRifa = {
            id,
            picture: picture.toString(),
            name,
            value
        };
        setSkinsCard(prevSkins => [...prevSkins, newSkin]);
    };

    return (
        <>
            <div className={style.ContentCard} >
                <Image src={`${process.env.NEXT_PUBLIC_REACT_NEXT_APP}/uploads/${picture}`} alt="Imagem do card" width={155} height={80} className={style.ImageCard} />
                <div className={style.DivDataCard}>
                    <p>{type} | {name}</p>
                    <p>R$: {value?.toFixed(2).replace('.', ',')}</p>
                </div>
                <div className={style.DivSettings}>
                <AnimatePresence>
                        {isDropdownOpen && (
                            <motion.div
                                animate={{ y: 0 }}
                                initial={{ y: -10 }}
                                exit={{ y: -10 }}
                                transition={{ duration: 0.5, type: "tween" }}
                                className={style.dropdownMenu}
                            >
                                <button className={style.buttonSelect} onClick={() => setPopUpSkins(true)}>Atualizar</button>
                                <button className={style.buttonSelect} onClick={() => { onDelete(id) }}>Deletar</button>
                                <button className={style.buttonSelect} onClick={handleAddToRaffle}>Add na rifa</button>
                            </motion.div>
                        )}
                    </AnimatePresence>
                    <IoSettingsSharp size={20}  onClick={()=> {setIsDropdownOpen(prevState => !prevState)}} />     
                </div>
                {popUpSkins && <PopUpUpdateSkins name={name} type={type} picture={picture} id={id} value={value} setPopUpSkins={setPopUpSkins} reloadSkins={reloadSkins}/>}
            </div>
        </>
    );
}
