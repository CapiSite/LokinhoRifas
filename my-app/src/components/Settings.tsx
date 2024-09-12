import Image from 'next/image';
import xmark from '../assets/xmark.svg';
import editPencil from '../assets/editPencil.svg';
import { UserContextType, UserSettingsType } from 'utils/interfaces';
import { useEffect, useRef, useState } from 'react';
import { useUserStateContext } from 'contexts/UserContext';
import axios from 'axios';
import MaskedInput from 'react-text-mask';
import { useRouter } from 'next/router';

import Eye from '../assets/eye.svg'
import EyeSlashed from '../assets/eye-slash.svg'

const Settings = ({ props }: { props: UserSettingsType }) => {
  const { profile, setShowSettings, image, setImage } = props;
  const inputRef = useRef<HTMLInputElement>(null);
  const { userInfo } = useUserStateContext() as UserContextType;

  const [userData, setUserData] = useState<any>({
    tradeLink: profile.tradeLink,
    newTradeLink: "",
    phoneNumber: profile.phoneNumber,
    newPhoneNumber: "",
    oldPassword: "",
    newPassword: "",
    picture: null
  });

  const [ tradelink, setTradelink ] = useState(userInfo.tradeLink)
  
  const router = useRouter()
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [ passwordVisible, setPasswordVisible ] = useState(false)
  const [ confirmPasswordVisible, setConfirmPasswordVisible ] = useState(false)

  const toggleStatePassword = (field: string) => {
    if(field == 'password') setPasswordVisible(oldPassword => !oldPassword)
    else setConfirmPasswordVisible(oldPassword => !oldPassword)
  }

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    if (name === "picture") {
      if (!inputRef.current) return;
      if (!inputRef.current.files) return;
      const file = inputRef.current.files[0];

      setImage(file);
      setUserData((prevState: any) => ({
        ...prevState,
        picture: file
      }));
      updateUser("Image", file);
    } else {
      setUserData((prevState: any) => ({
        ...prevState,
        [name]: value
      }));
    }
  };

  const updateUser = async (object: string, file?: File) => {
    setError('');
    setSuccess('');

    const token = localStorage.getItem("token");
    const formData = new FormData();
    let signUpData: any = {};
    if (userData.newTradeLink !== "") {
      signUpData.tradeLink = userData.newTradeLink;
    }
    if (userData.newPhoneNumber !== "") {
      signUpData.phoneNumber = userData.newPhoneNumber;
    }

    if (object === "password") {
      if (userData.newPassword.length < 6) {
        return setError("A nova senha deve ter pelo menos 6 caracteres");
      }
      signUpData.newPassword = userData.newPassword;
      signUpData.oldPassword = userData.oldPassword;
    }

    formData.append('signUpData', JSON.stringify(signUpData));
    if (file) {
      formData.append('picture', file);
    } else {
      formData.append('picture', "Default");
    }
    try {
      const response = await axios.put(`${process.env.NEXT_PUBLIC_REACT_NEXT_APP}/users/update/${userInfo.id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`
        }
      });
      if (response.status === 200) {
        if (object === "newTradeLink") {
          setUserData((prevState: any) => ({ ...prevState, tradeLink: userData.newTradeLink, newTradeLink: "" }));
          setSuccess(`Alterou TradeLink atualizado com sucesso!`);
        } else if (object === "password") {
          setUserData((prevState: any) => ({ ...prevState, oldPassword: "", newPassword: "" }));
          setSuccess(`Alterou senha atualizado com sucesso!`);
        } else if (object === "Image") {
          setUserData((prevState: any) => ({ ...prevState, picture: null }));
          setSuccess(`Alterou foto de perfil atualizado com sucesso!`);
        } else if (object === "phoneNumber") {
          setUserData((prevState: any) => ({ ...prevState, phoneNumber: userData.newPhoneNumber, newPhoneNumber: "" }));
          setSuccess(`Alterou número de telefone atualizado com sucesso!`);
        }

      } else {
        throw new Error('Erro ao atualizar os dados');
      }
    } catch (err: any) {
      if (object === "newTradeLink") {
        setError(`Falha em alterar o TradeLink`);
      } else if (object === "password") {
        setError(`Senha antiga incorreta`);
      } else if (object === "Image") {
        setError(`Falha em alterar a foto`);
      } else {
        setError(`Falha em alterar o número de telefone`);
      }
    }
  };

  const resolveToast = () => {
    setError('');
    setSuccess('');
  }

  const deleteAccount = async () => {
    const token = localStorage.getItem("token");

    try {
      const response = await axios.delete(`${process.env.NEXT_PUBLIC_REACT_NEXT_APP}/users/${userInfo.id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (response.status === 200) {
        setSuccess("Conta deletada com sucesso");
        setTimeout(()=>{router.push('/login')}, 4000)
        setTimeout(()=>{window.location.reload() }, 4000) 
      }
    } catch (err: any) {
      setError(err.response?.data?.message || "Erro ao deletar a conta. Verifique se você está em alguma rifa ativa");
    }
  }
  
  useEffect(() => {
    const halves = userInfo.tradeLink ? userInfo.tradeLink != '' ? userInfo.tradeLink.split('?')[1].split('&') : '' : ''
    setTradelink(`${halves[0]} ${halves[1]}`)
  }, [userInfo.tradeLink])

  return (
    <div className="config">
      <div className="statusWrapper">
        {success && <div onClick={() => resolveToast()} className="success">{success}</div>}
        {error && <div onClick={() => resolveToast()} className="error">{error}!</div>}
      </div>
      <div className="configWrapper">
        <div className="configWrapperContent">
          <h2>Configurações de usuário</h2>
          <div className="accountInfo">
            <div className="imageBox">
              <Image width={200} height={200} src={image ? URL.createObjectURL(image) : profile.picture} alt="Imagem de perfil" />
              <button type="button" onClick={() => inputRef.current?.click()}>
                <Image width={18} height={18} src={editPencil} alt={'Editar foto de perfil'} />
                <input type="file" onChange={(e) => handleChange(e)} name="picture" id="profilePic" ref={inputRef} />
              </button>
            </div>
            <div className="accountContent">
              <h2>{profile.name}</h2>
              <p>{profile.email}</p>
              <p>Conta criada: 01/08/2024</p>
            </div>
          </div>
          <div className="boxGroup">
            <div className="box">
              <h3>Alterar Trade Link</h3>
              <label>
                Trade Link Atual:
                <p className='important'>{userData.tradeLink ? tradelink : 'Sem trade links registrados!'}</p>
              </label>
              <label>
                Novo Trade Link:
                <input name="newTradeLink" id="3" value={userData.newTradeLink} onChange={e => handleChange(e)} />
              </label>
              <button onClick={() => updateUser("newTradeLink")}>Enviar código</button>
            </div>
            <div className="box">
              <h3>Alterar telefone</h3>
              <label>
                Número de celular atual:
                <p>{userData.phoneNumber || 'Nenhum celular registrado'}</p>
              </label>
              <label>
                Novo número:
                <MaskedInput
                  defaultValue={""}
                  mask={[
                    "(",
                    /[0-9]/,
                    /\d/,
                    ")",
                    " ",
                    /\d/,
                    /\d/,
                    /\d/,
                    /\d/,
                    /\d/,
                    "-",
                    /\d/,
                    /\d/,
                    /\d/,
                    /\d/,
                  ]}
                  type="tel"
                  onChange={(e => handleChange(e))}
                  value={userData.newPhoneNumber}
                  name="newPhoneNumber"
                />
              </label>
              <button onClick={() => updateUser("phoneNumber")}>Alterar</button>
            </div>
            <div className="box">
              <h3>Alterar senha</h3>
              <label>
                Senha antiga:
                <div className="inputWrapper">
                  <input type={passwordVisible ? 'text' : "password"} name="oldPassword" id="1" value={userData.oldPassword} onChange={(e => handleChange(e))} />
                  <button onClick={() => toggleStatePassword('password')}>
                    {passwordVisible ?
                    <Image src={EyeSlashed} alt="Hide password"/> : <Image src={Eye} alt="Show password"/>}
                  </button>
                </div>
              </label>
              <label>
                Nova senha:
                <div className="inputWrapper">
                  <input type={confirmPasswordVisible ? 'text' : "password"} name="newPassword" id="" value={userData.newPassword} onChange={(e => handleChange(e))} />
                  <button onClick={() => toggleStatePassword('confirmPassword')}>
                    {confirmPasswordVisible ?
                    <Image src={EyeSlashed} alt="Hide password"/> : <Image src={Eye} alt="Show password"/>}
                  </button>
                </div>
              </label>
              <button onClick={() => updateUser("password")}>Enviar código</button>
            </div>
            <div className="box">
              <h3><span className="highlight">Deletar</span> minha conta</h3>
              <p>
                Esta operação é <span className="highlight">irreversível</span>. Por favor, certifique-se de que deseja prosseguir antes de confirmar.<br /><br />
                Para sua segurança, haverá <span className="highlight">etapas de confirmação</span>.<br /><br />
                A equipe do Lokinho não se <span className="highlight">responsabilizará</span> por arrependimentos ou mudanças de opinião após a confirmação.
              </p>
              <button onClick={() => deleteAccount()}>Deletar conta</button>
            </div>
          </div>
        </div>
      </div>
      <div className="configBackground" onClick={() => setShowSettings(false)}></div>
    </div>
  );
}

export default Settings;
