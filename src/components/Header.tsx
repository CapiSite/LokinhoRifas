import Image from 'next/image';
import { useSidebarState } from '../contexts/SidebarContext';
import logo from '../images/Logo.png'

const Header = () => {
  const { sidebarView, toggleSidebar } = useSidebarState()

  return (
    <header className={sidebarView ? 'no-background' : ''}>
      <div className="HeaderWrapper">
        <div className="MainHeader">
          <Image className='Logo' src={logo} alt="Logo de Lokinho Rifas" />
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
        <button onClick={() => toggleSidebar()} className='mobile tablet'>{sidebarView ? 'X' : '|||'}</button>
      </div>
    </header>
  );
}
 
export default Header;