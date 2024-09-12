import Image from "next/image";
import styles from './users.module.css';
import { UsersProps } from "utils/interfaces";

export default function Users({ id, image, name, tradeLink, email, charge, context, onChargeChange, onDeleteUser, onDeleteUserRaffle, onAddUser, onnumberChange }: UsersProps) {
    return (
        <div className={styles.ContainerUser}>
            <Image width={55} height={55} src={image} className={styles.ImageUser} alt='Foto de perfil' />
            <div className={styles.UserDate}>
                <p className={ styles.FullNameUser2}>{name}</p>
                <p className={ styles.EmailUser2 }>{email}</p>
                <p className={styles.EmailUser2}>{tradeLink}</p> 
            </div>
            <div className={styles.management}>
                {/* Adicionar ou remover usuário da rifa, conforme contexto */}
                {context === "ParticipantsRafle" && (
                    <div className={styles.deleteUser} onClick={() => onDeleteUserRaffle(id)}>Remover</div>
                )}

                {context === "addParticipantsRaflle" && (
                    <div className={styles.AddUser} onClick={() => onAddUser(id)}>Adicionar</div>
                )}
            </div>
        </div>
    );
}
