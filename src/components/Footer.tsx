import Logo from '../images/Logo.png'
import ExternalLink from '../assets/ExternalLink.svg'
import Image from 'next/image';

const Footer = () => {
  return (
    <footer>
        <div className="FooterWrapper">
          <div className="CompanyInfo">
            <Image className='Logo' src={Logo} alt="Logo da empresa Lokinho Skins" />
            <p>Loquinho Skins Ltda © 2024.<br />Todos os Direitos Reservados<br />CNPJ: 50.278.011/0001-06</p>
          </div>

          <nav>
            <div className="InternalLinks">
              <h2>Links</h2>

              <ul>
                <li>Vantagens</li>
                <li>Grupos</li>
                <li>Sobre Nós</li>
              </ul>
            </div>
            <div className="ExternalLinks">
              <h2>Links úteis</h2>

              <ul>
                <a href="#" target='_blank'><li><Image className='ExternalArrow' src={ExternalLink} alt="Seta para link" />Facebook</li></a>
                <a target='_blank' href="https://instagram.com/lokinhoskins"><li><Image className='ExternalArrow' src={ExternalLink} alt="Seta para link" />Instagram</li></a>
                <a target='_blank' href="https://api.whatsapp.com/send?phone=5586981088012"><li><Image className='ExternalArrow' src={ExternalLink} alt="Seta para link" />Whatsapp</li></a>
                <a target='_blank' href="#"><li><Image className='ExternalArrow' src={ExternalLink} alt="Seta para link" />Discord</li></a>
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