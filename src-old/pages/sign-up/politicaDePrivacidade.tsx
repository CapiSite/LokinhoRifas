import style from "./styles/SignUp.module.css";
import { useState } from "react";
const PoliticaDePrivacidade = () => {
    const [isChecked, setIsChecked] = useState(false);

    const handleCheckboxChange = (e: any) => {
        setIsChecked(e.target.checked);
    };


    const handleCadastroClick = () => {
        if (!isChecked) {
            alert("Por favor, aceite os termos antes de cadastrar.");
        }
    };

    return (
        <>
            <div className={style.Policygroup}>
                <h1 className={style.privacyPolicy}>Política de privacidade</h1>
                <p className={style.policy}>Última atualização: [data]
                    A [Nome da Empresa] (nós, nosso ou nos) opera o website [www.exemplo.com] (doravante referido como o Serviço).
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
                    Contate-Nos
                    Se você tiver alguma dúvida sobre esta Política de Privacidade, entre em contato conosco através do email: [email@example.com].</p>
                <div className={style.checkboxcontainer}>
                    <input type="checkbox" className={style.checkbox} onChange={handleCheckboxChange} />
                    <label className={style.termo}>Aceite os termos</label>
                </div>
                <div className={style.containersubimit}>
                    <button type="submit" className={style.enviar} onClick={handleCadastroClick}>
                        Cadastrar
                    </button>
                </div>
            </div>
        </>
    );
};

export default PoliticaDePrivacidade;