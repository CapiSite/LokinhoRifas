import Image from "next/image";
import styles from './users.module.css';
import { UsersProps } from "utils/interfaces";

export default function Users({ id, image, name, tradeLink, email, charge, count, context, onDeleteUserRaffle, onAddUser, onDeleteUser }: UsersProps) {
    return (
        <div className={styles.ContainerUser}>
            <Image width={55} height={55} src={image} className={styles.ImageUser} alt='Foto de perfil' />
            <div className={styles.UserDate}>
                <p className={styles.FullNameUser2}>{name}</p>
                <p className={styles.EmailUser}>{email}</p>
                <p className={styles.tradLink}>{tradeLink}</p>
            </div>
            <div className={styles.management}>
                {context === "ParticipantsRafle" && (
                    <div className={styles.divNumberRaflle}>
                        <p className={styles.countNumber}>Qtd de números: {count}</p> 
                        <div className={styles.deleteUser} onClick={() => onDeleteUserRaffle(id)}>Remover</div>
                    </div>
                )}

                {context === "addParticipantsRaflle" && (
                    <>
                    <div className={styles.AddUser} onClick={() => onAddUser(id)}>Adicionar</div>
                    <div className={styles.DeleteUser} onClick={() => onDeleteUser(id)}>Deletar Usuário</div>
                    </>
                )}
            </div>
        </div>
    );
}

