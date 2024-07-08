import Image from 'next/image';
import { useSidebarState } from '../contexts/SidebarContext';
import logo from '../images/Logo.png';
import Xmark from '../assets/xmark.svg';

const Header = () => {
  const { sidebarView, toggleSidebar }:any = useSidebarState()

  return (
    <header className={sidebarView ? 'no-background' : ''}>
      <div className="HeaderWrapper">
        <div className="MainHeader">
          <Image className={sidebarView ? 'Logo SidebarOn' : 'Logo'} src={logo} alt="Logo de Lokinho Rifas" />
          <nav className='desktop'>
            <ul>
              <li>Home</li>
              <li>Vantagens</li>
              <li>Grupos</li>
              <li>Sobre Nós</li>
            </ul>
          </nav>
        </div>
        <button className='desktop'>Faça Parte!</button>
        <button onClick={() => toggleSidebar()} className='mobile tablet'>{sidebarView ? <Image src={Xmark} alt="Fechar sidebar" /> : '|||'}</button>
      </div>
    </header>
  );
}
 
export default Header;