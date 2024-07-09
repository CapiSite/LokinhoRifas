import style from '../roletta.module.css'
import RouletteItem from './RouletteItem';

const RouletteArray = () => {
  const items = [
    {
      color: 'Blue',
      profilePicture: '',
      personName: 'Alison Sousa',
      nickName: 'nome_de_usuário'
    },
    {
      color: 'Red',
      profilePicture: '',
      personName: 'Alison Sousa',
      nickName: 'nome_de_usuário'
    },
    {
      color: 'Yellow',
      profilePicture: '',
      personName: 'Alison Sousa',
      nickName: 'nome_de_usuário'
    },
    {
      color: 'Purple',
      profilePicture: '',
      personName: 'Alison Sousa',
      nickName: 'nome_de_usuário'
    },
    {
      color: 'Green',
      profilePicture: '',
      personName: 'Alison Sousa',
      nickName: 'nome_de_usuário'
    },
    {
      color: 'Blue',
      profilePicture: '',
      personName: 'Alison Sousa',
      nickName: 'nome_de_usuário'
    },
    {
      color: 'Red',
      profilePicture: '',
      personName: 'Alison Sousa',
      nickName: 'nome_de_usuário'
    },
    {
      color: 'Yellow',
      profilePicture: '',
      personName: 'Alison Sousa',
      nickName: 'nome_de_usuário'
    },
    {
      color: 'Purple',
      profilePicture: '',
      personName: 'Alison Sousa',
      nickName: 'nome_de_usuário'
    },
    {
      color: 'Green',
      profilePicture: '',
      personName: 'Alison Sousa',
      nickName: 'nome_de_usuário'
    },
    {
      color: 'Blue',
      profilePicture: '',
      personName: 'Alison Sousa',
      nickName: 'nome_de_usuário'
    },
    {
      color: 'Red',
      profilePicture: '',
      personName: 'Alison Sousa',
      nickName: 'nome_de_usuário'
    },
    {
      color: 'Yellow',
      profilePicture: '',
      personName: 'Alison Sousa',
      nickName: 'nome_de_usuário'
    },
    {
      color: 'Purple',
      profilePicture: '',
      personName: 'Alison Sousa',
      nickName: 'nome_de_usuário'
    },
    {
      color: 'Green',
      profilePicture: '',
      personName: 'Alison Sousa',
      nickName: 'nome_de_usuário'
    },
    {
      color: 'Blue',
      profilePicture: '',
      personName: 'Alison Sousa',
      nickName: 'nome_de_usuário'
    },
    {
      color: 'Red',
      profilePicture: '',
      personName: 'Alison Sousa',
      nickName: 'nome_de_usuário'
    },
    {
      color: 'Yellow',
      profilePicture: '',
      personName: 'Alison Sousa',
      nickName: 'nome_de_usuário'
    },
    {
      color: 'Purple',
      profilePicture: '',
      personName: 'Alison Sousa',
      nickName: 'nome_de_usuário'
    },
    {
      color: 'Green',
      profilePicture: '',
      personName: 'Alison Sousa',
      nickName: 'nome_de_usuário'
    },
  ]

  return (
    <div className={style.RouletteArray}>
      {items.map((item, index) => <RouletteItem key={index} props={item}/>)}
    </div>
  );
}
 
export default RouletteArray;