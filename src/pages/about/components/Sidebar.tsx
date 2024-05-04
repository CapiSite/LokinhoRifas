import Profile from './Profile';
import Image from 'next/image';
import HeaderSidebar from './HeaderSidebar'
import style from "../styles/Sidebar.module.css";
import { AnimatePresence, motion } from "framer-motion";
import { AiOutlineClose } from "react-icons/ai";
import Logo from '@/images/logo.jpg'

export default function Sidebar({ sideBar, setSideBar }: any) {

  return (

    <div className={style.background}>
      <AiOutlineClose onClick={() => setSideBar(!sideBar)} />
      <Profile />
      <Image src={Logo} alt='Logo do site' className={style.Logo} />
      <hr className={style.Linha} />
      <HeaderSidebar />
    </div>
  );
}