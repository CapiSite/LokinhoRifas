import Logo from '../images/Logo.png'
import ExternalLink from '../assets/ExternalLink.svg'

import Image from 'next/image';
import { useRouter } from "next/router";

import { useSidebarState } from "../contexts/SidebarContext";
import Link from 'next/link';

const Footer = () => {
  const { toggleSidebar } = useSidebarState() as { toggleSidebar:Function }
  
  const router = useRouter()

  return (
    <footer>
        <div className="FooterWrapper">
          <div className="CompanyInfo">
            <div className="LogoBox">
              <Image className='Logo' src={Logo} alt="Logo da empresa Lokinho Skins" />
            </div>
            <p>Lokinho Skins Ltda © 2024.<br />Todos os Direitos Reservados<br />CNPJ: 50.278.011/0001-06</p>
          </div>

          <nav>
            <div className="InternalLinks">
              <h2>Links</h2>

              <ul>
                <li onClick={() => router.push('/#Home')}>Home</li>
                <li onClick={() => router.push('/roleta')}>Sorteio</li>
                <li onClick={() => router.push('/live')}>Live</li>
                <li onClick={() => router.push('/ultimosganhadores')}>Últimos Ganhadores</li>
                <li onClick={() => router.push('/#SobreNos')}>Sobre Nós</li>
            </ul>
            </div>
            <div className="ExternalLinks">
              <h2>Links úteis</h2>

              <ul>
                <Link target='_blank' href="https://instagram.com/lokinhoskins"><li><Image className='ExternalArrow' src={ExternalLink} alt="Seta para link" />Instagram</li></Link>
                <Link target='_blank' href="https://api.whatsapp.com/send?phone=5586981088012"><li><Image className='ExternalArrow' src={ExternalLink} alt="Seta para link" />Whatsapp</li></Link>
                <Link target='_blank' href="termosdeprivacidade"><li>Termos de privacidade</li></Link>
                <Link target='_blank' href="/termosdeservico"><li>Termos de uso</li></Link>
              </ul>
            </div>
            <div className="ContactInfo">
              <h2>Atendimento</h2>

              <ul>
                <li>lokinhoskins@gmail.com</li>
                <li>(86) 9.8108-8012 - Compra e Venda</li>
                <li>(81) 9.9895-8653 - Rifas</li>
              </ul>
            </div>
          </nav>
        </div>
      </footer>
  );
}
 
export default Footer;