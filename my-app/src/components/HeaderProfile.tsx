import { useUserStateContext } from "contexts/UserContext";
import { UserContextType }  from '../utils/interfaces'
import Image from "next/image";

import defaultProfilePicture from '../assets/defaultProfilePic.svg'
import { useState } from "react";
import { useRouter } from "next/router";

const HeaderProfile = () => {
  const { userInfo, setShowBudget, logOut, image, openConfig } = useUserStateContext() as UserContextType
  const [ showDropdown, setShowDropdow ] = useState<boolean>(false)

  const router = useRouter()

  const { name, email, picture, saldo, isAdmin } = userInfo

  const saldoString = saldo ? saldo.toString() : '0'

  const profile = {
    name: name != '' ? name : 'notloggedinuser',
    email: email != '' ? email : 'notloggedinuser@gmail.com',
    picture: picture === "default" ? defaultProfilePicture :
    (picture && picture.startsWith('https://static-cdn.jtvnw.net')) ? 
    picture : `${process.env.NEXT_PUBLIC_REACT_NEXT_APP}/uploads/${picture}`,
    budget: saldoString.includes('.') ? `${saldoString.split('.')[0]},${saldoString.split('.')[1][0]}${saldoString.split('.')[1][1] ? saldoString.split('.')[1][1] : '0'}` : `${saldoString},00`
  }

  const toggleOnDropdownVisibility = () => {
    if(showDropdown) return
    setShowDropdow(oldValue => !oldValue)

    const dropdown = document.getElementById('headerDropdownInput')

    dropdown?.focus()
  }

  const toggleOffDropdownVisibility = () => {
    if(!showDropdown) return

    setTimeout(() => {
      setShowDropdow(oldValue => !oldValue)
    }, 400);
  }

  function handleLogout() {
    logOut()
  };

  const openBudgetPayment = () => {
    setShowBudget(true)
  }

  return (
    <div className="Profile">
      <div className="ProfileWrapper">
        <div className="ProfileContent" onClick={() => toggleOnDropdownVisibility()}>
          <div className="ProfilePicture">
            <Image width={160} height={160} src={image ? URL.createObjectURL(image) : profile.picture} alt="Imagem de perfil"/>
          </div>
          <div className="ProfileText">
            <h2>{profile.name}</h2>
            <h3>{profile.email}</h3>
          </div>
        </div>

      </div>

      <div className={`Dropdown ${showDropdown ? 'showDropdown' : ''}`}>
        <input type="text" id="headerDropdownInput" onBlur={() => toggleOffDropdownVisibility()}/>
        <ul>
          <li onClick={() => openConfig()}>Configurações</li>
          {isAdmin && <li onClick={() => router.push('/admin')}>Painel</li>}
          <li onClick={() => handleLogout()}>Sair</li>
          <button onClick={() => openBudgetPayment()}>Saldo: R$<span className="Value">{profile.budget}</span></button>
        </ul>
      </div>
    </div>
  );
}
 
export default HeaderProfile;