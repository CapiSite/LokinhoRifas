import { useUserStateContext } from "contexts/UserContext";
import { SidebarContextType, UserContextType }  from '../utils/interfaces'
import Image from "next/image";

import defaultProfilePicture from '../assets/defaultProfilePic.svg'
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useSidebarState } from "contexts/SidebarContext";

const HeaderProfileMobile = () => {
  const { userInfo, setUserInfo, setShowBudget, image, showSettings, setShowSettings } = useUserStateContext() as UserContextType
  const [ showDropdown, setShowDropdow ] = useState<boolean>(false)
  const { toggleSidebar } = useSidebarState() as SidebarContextType

  useEffect(() => {
    const html = document.querySelector('html')

    
    html?.classList.toggle('scrollOff', showSettings)
  }, [showSettings])

  const { name, email, picture, saldo } = userInfo

  const saldoString = saldo ? saldo.toString() : '0'

  const router = useRouter()
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

  const openConfig = () => {
    setShowSettings(true)
  }

  function handleLogout() {
    localStorage.setItem("token", "");
    setUserInfo({ id: "", name: "", email: "", picture: "", token: "", isAdmin: false, phoneNumber: "", tradeLink: "", saldo: 0 });
    router.push('/cadastro');
    toggleSidebar();
  };

  const openBudgetPayment = () => {
    setShowBudget(true)
  }

  return (
    <div className="Profile">
      <div className="ProfileWrapper">
        <div className="ProfileContent" onClick={() => toggleOnDropdownVisibility()}>
          <div className="ProfilePicture">
            <Image width={40} height={40} src={image ? URL.createObjectURL(image) : profile.picture} alt="Imagem de perfil"/>
          </div>
          <div className="ProfileText">
            <h2>{profile.name}</h2>
            <h3>{profile.email}</h3>
          </div>
        </div>

      </div>

      <div className={`Dropdown ${showDropdown ? 'showDropdown' : ''}`}>
        <ul>
          <li onClick={() => openConfig()}>Configurações</li>
          <li onClick={() => handleLogout()}>Sair</li>
          <button onClick={() => openBudgetPayment()}>Saldo: R$<span className="Value">{profile.budget}</span></button>
        </ul>
      </div>
    </div>
  );
}
 
export default HeaderProfileMobile;