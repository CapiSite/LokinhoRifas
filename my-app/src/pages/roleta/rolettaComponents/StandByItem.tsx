import style from '../roletta.module.css'
import defaultPicture from '../../../assets/defaultProfilePic2.svg'
import { useEffect, useState } from 'react';
import Image from 'next/image';

const StandByItem = ({user}: { user: { name: string, picture: string, number: number } }) => {
  if(!user) return <div>No user found</div>

  const { name = 'Unknown', picture = '', number = 0 } = user

  const [imgSrc, setImgSrc] = useState<string>(defaultPicture);

  useEffect(() => {
    const debounce = setTimeout(() => {
      if (!picture) return setImgSrc(defaultPicture.src);
      else if(picture.includes('https://static-cdn.jtvnw.net')) {
        setImgSrc(picture);
      } else if (!picture.includes('default') && picture !== imgSrc) {
        setImgSrc(picture);
      }

      return () => clearTimeout(debounce)
    }, 400);
  }, [picture]);

  return (
    <div className={style.user}>
      <Image width={136} height={136} src={imgSrc} alt={`Foto de perfil de ${name || 'Unknown'}`}/>
      <h1>{name}#{number}</h1>
    </div>
  );
}
 
export default StandByItem;