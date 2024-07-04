import { useState, useEffect } from "react";
import style from "./styles/privacyPolicy.module.css";
import backgroundImg from "../../images/background.png";
import Image from "next/image";
const PrivacyPolicy = () => {


  return (
    <>
      <div className={style.containerpolicy}>
        <div className={style.imagePreviewContainer}>
          <Image className={style.background} width={100} height={100} src={backgroundImg} alt="background" />
        </div>
        <h1 className={style.Title}>Políticas de privacidade</h1>
        <p className={style.policy}>Última atualização: [data]<br />
          A [Nome da Empresa] ("nós", "nosso" ou "nos") opera o website [www.exemplo.com] (doravante referido como o "Serviço").
          Esta página informa sobre nossas políticas relativas à coleta, uso e divulgação de informações pessoais quando você usa nosso Serviço.
          Coleta e Uso de Informações
          Não coletamos informações pessoais identificáveis, como seu nome, endereço, número de telefone ou endereço de e-mail, a menos que você as forneça voluntariamente.
          Dados de Log
          Nós seguimos uma política de log padrão. Isso significa que seus dados de log podem incluir informações como seu endereço IP, tipo de navegador, provedor de serviços de Internet, páginas que você visitou em nosso site, a hora e a data de sua visita, o tempo gasto nessas páginas e outras estatísticas.
          Cookies
          Nós não usamos cookies para rastrear a atividade do usuário. No entanto, podemos usar cookies de terceiros para melhorar a funcionalidade do nosso site.
          Compartilhamento de Informações
          Nós não compartilhamos informações pessoais identificáveis publicamente ou com terceiros, exceto quando exigido por lei.
          Links para Outros Sites
          Nosso Serviço pode conter links para outros sites que não são operados por nós. Se você clicar em um link de terceiros, você será direcionado para o site desse terceiro. Recomendamos vivamente que reveja a Política de Privacidade de todos os sites que visita.
          Alterações a esta Política de Privacidade
          Podemos atualizar nossa Política de Privacidade de tempos em tempos. Recomendamos que você revise esta página periodicamente para quaisquer alterações. Notificaremos você de quaisquer alterações, publicando a nova Política de Privacidade nesta página.
          <br />Contate-Nos:<br />
          Se você tiver alguma dúvida sobre esta Política de Privacidade, entre em contato conosco através do email: [email@example.com].
        </p>
      </div>
    </>
  );
};

export default PrivacyPolicy;