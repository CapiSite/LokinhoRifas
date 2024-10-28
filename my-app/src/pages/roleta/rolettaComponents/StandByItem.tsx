import style from '../roletta.module.css';
import defaultPicture from '../../../assets/defaultProfilePic2.svg';
import { memo, useMemo } from 'react';
import Image from 'next/image';

const StandByItem = ({ user }: { user: { name: string, picture: string, number: number } }) => {
  if (!user) return <div>No user found</div>;

  const { name = 'Unknown', picture = '', number = 0 } = user;

  // Use `useMemo` para calcular a fonte da imagem apenas quando `picture` mudar
  const imgSrc = useMemo(() => {
    if (!picture) return defaultPicture.src;
    if (picture.includes('https://static-cdn.jtvnw.net')) return picture;
    if (!picture.includes('default')) return picture;
    return defaultPicture.src;
  }, [picture]);

  return (
    <div className={style.user}>
      <Image width={136} height={136} src={imgSrc} alt={`Foto de perfil de ${name}`} />
      <h1>{name}#{number}</h1>
    </div>
  );
};

// Exportando o componente memoizado
export default memo(StandByItem);
