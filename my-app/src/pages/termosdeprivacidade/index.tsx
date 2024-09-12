import style from './privacy.module.css'

const Privacy = () => {
  return (
    <section className={style.privacy}>
      <div className={style.privacyWrapper}>
        <h1>Política de Privacidade</h1>
          <h2>1. Introdução</h2>
          <p>Bem-vindo ao Lokinho Skins. Nós valorizamos sua privacidade e estamos comprometidos em proteger suas informações pessoais. Esta política de privacidade descreve como coletamos, usamos e protegemos suas informações quando você se cadastra em nosso site para participar de rifas.</p>

          <h2>2. Informações que Coletamos</h2>
          <p>Para participar de nossas rifas, podemos coletar as seguintes informações:</p>
              {/* Nome completo */}
              <ul>
                <li>Endereço de e-mail</li>
                <li>Número de telefone</li>
                <li>Dados de pagamento (se aplicável)</li>
                <li>Tradelink</li>
              </ul>
          
          <h2>3. Uso das Informações</h2>
          <p>Utilizamos suas informações para:</p>
              <ul>
                <li>Registrar sua participação nas rifas</li>
                <li>Entrar em contato com você sobre sua participação e resultados</li>
                <li>Enviar atualizações, promoções e outras comunicações relevantes</li>
                <li>Melhorar nossos serviços e experiência do usuário</li>
                <li>Cumprir obrigações legais e regulamentares</li>
              </ul>
          
          <h2>4. Compartilhamento de Informações</h2>
          <p>Não vendemos, alugamos ou compartilhamos suas informações pessoais com terceiros, exceto nos seguintes casos:</p>
              <ul>
                <li>Com provedores de serviços que auxiliam na operação do nosso site e execução das rifas (sob acordos de confidencialidade)</li>
                <li>Quando exigido por lei ou para responder a processos legais</li>
                <li>Para proteger os direiprivacy, propriedade ou segurança do Lokinho Skins, de nossos usuários ou do público</li>
              </ul>
          
          <h2>5. Segurança das Informações</h2>
          <p>Implementamos medidas de segurança apropriadas para proteger suas informações pessoais contra acesso não autorizado, alteração, divulgação ou destruição. No entanto, nenhum método de transmissão pela internet ou de armazenamento eletrônico é completamente seguro.</p>

          <h2>6. Seus Direitos</h2>
          <p>Você tem o direito de:</p>
              <ul>
                <li>Acessar, corrigir ou excluir suas informações pessoais</li>
                <li>Retirar seu consentimento para o uso de suas informações</li>
                <li>Solicitar a transferência de suas informações para outra entidade</li>
                <li>Fazer uma reclamação junto a uma autoridade de proteção de dados</li>
              </ul>

          
          <h2>7. Cookies</h2>
          <p>Utilizamos cookies para melhorar sua experiência em nosso site. Os cookies são pequenos arquivos de texto armazenados em seu dispositivo. Você pode configurar seu navegador para recusar cookies, mas isso pode afetar a funcionalidade do site.</p>

          <h2>8. Alterações na Política de Privacidade</h2>
          <p>Podemos atualizar esta política de privacidade periodicamente. As alterações serão publicadas em nosso site com a data de revisão atualizada. Recomendamos que você revise esta política regularmente.</p>
          
          <h2>9. Contato</h2>
          <p>Se você tiver dúvidas ou preocupações sobre esta política de privacidade, entre em contato conosco em:</p>
          <p>lokinhoskins@gmail.com</p>
      </div>
    </section>
  );
}
 
export default Privacy;