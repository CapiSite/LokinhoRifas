import { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import style from './admin.module.css';
import ProfileInformations from './adminComponents/ProfileInformations';
import CardSkins from './adminComponents/CardSkins';
import { RegisterRifa, SkinType } from 'utils/interfaces';
import { IoSearch } from "react-icons/io5";
import RegisterRaffle from './adminComponents/RegisterRaffle';
import RifasCadastradas from './adminComponents/RifasCadastradas/RifasCadastradas';
import ChangeTextLive from './adminComponents/ChangeTextLive';

export default function Admin() {
  const [skinTeste2, setSkinteste] = useState<SkinType[]>([]);
  const [erroskins, setErrorSkins] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [skinsCard, setSkinsCard] = useState<RegisterRifa[]>([]);
  const [userInfo, setUserInfo] = useState({
    id: "",
    name: "",
    email: "",
    picture: "",
    token: "",
    isAdmin: false,
    phoneNumber: "",
    tradeLink: "",
    saldo: 0
  });
  const router = useRouter();

  // Verifica se o usuário tem permissão (token de admin) para acessar a página
  useEffect(() => {
    const storedToken = localStorage.getItem("token");

    if (storedToken) {
      axios
        .post(
          process.env.NEXT_PUBLIC_REACT_NEXT_APP + "/auth",
          {},
          {
            headers: {
              Authorization: `Bearer ${storedToken}`,
            },
          }
        )
        .then((res) => {
          setUserInfo({
            id: res.data.user.id,
            name: res.data.user.name,
            email: res.data.user.email,
            picture: res.data.user.picture,
            token: res.data.user.token,
            isAdmin: res.data.user.isAdmin,
            phoneNumber: res.data.user.phoneNumber,
            tradeLink: res.data.user.tradeLink,
            saldo: res.data.user.saldo,
          });

          // Se não for admin, redireciona para outra rota
          if (!res.data.user.isAdmin) {
            router.push('/');
          }
        })
        .catch((err) => {
          localStorage.setItem("token", "");
          setUserInfo({
            id: "",
            name: "",
            email: "",
            picture: "",
            token: "",
            isAdmin: false,
            phoneNumber: "",
            tradeLink: "",
            saldo: 0,
          });
          router.push('/login'); 
        });
    } else {
      router.push('/login'); 
    }
  }, [router]);

  useEffect(() => {
    if (userInfo.isAdmin) {
      loadSkins();
    }
  }, [userInfo.isAdmin]);

  const loadSkins = () => {
    axios.get(process.env.NEXT_PUBLIC_REACT_NEXT_APP + "/skin")
      .then((res) => {
        setSkinteste(res.data);
      })
      .catch((err) => {
        setErrorSkins(err.response.data);
      });
  };

  function handleDeleteCard(id: number) {
    const token = localStorage.getItem('token');
    setSkinteste(skinTeste2.filter(data => data.id !== id));
    axios.delete(process.env.NEXT_PUBLIC_REACT_NEXT_APP + `/skin/${id}`, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`
      }
    })
      .then(res => {
        alert("Skin deletada");
      })
      .catch(err => {
        alert("Skin não deletada");
      });
  }

  const filterUsers = skinTeste2.filter(user => user.name.toLowerCase().includes(searchQuery.toLowerCase()));

  // Renderiza a tela de admin apenas se o usuário for admin
  if (!userInfo.isAdmin) {
    return <p>Loading...</p>;
  }

  return (
    <div className={style.ContainerAdmin}>
      <div className={style.ContentAdmin}>
        <ProfileInformations reloadSkins={loadSkins} />
      </div>
      <div className={style.inputNavBarContainer}>
        <IoSearch className={style.searchIconMember} />
        <input
          type='text'
          className={style.inputNavBarMember}
          placeholder="Pesquisar Pelo nome da Skin"
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
        />
      </div>
      <div className={style.ContainerCards}>
        {filterUsers.map((data) =>
          <CardSkins
            key={data.id}
            id={data.id}
            name={data.name}
            value={data.value}
            type={data.type}
            picture={data.picture}
            onDelete={handleDeleteCard}
            reloadSkins={loadSkins}
            skinsCard={skinsCard}
            setSkinsCard={setSkinsCard}
          />
        )}
      </div>
      <RegisterRaffle skinsCard={skinsCard} setSkinsCard={setSkinsCard} />
      <RifasCadastradas />
      <ChangeTextLive />
    </div>
  );
}
