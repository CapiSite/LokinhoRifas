import style from '../roletta.module.css'

import Image from 'next/image';
import cn from 'classnames';

const RouletteItem = ({props}: any) => {
  const { color, profilePicture, personName, nickName } = props

  return (
    <div className={cn(style.PersonCard, style?.[color])}>
      <div className={style.ProfilePicture}>
        <Image src={profilePicture} alt={`Foto de perfil de ${personName}`}/>
      </div>
      <div className={style.ProfileInfo}>
        <h3>{personName}</h3>
        <p>{nickName}</p>
      </div>
    </div>
  );
}
 
export default RouletteItem;