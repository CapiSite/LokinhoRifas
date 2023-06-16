import style from "@/styles/Sidebar.module.css";
import { AnimatePresence, motion } from "framer-motion";
import { AiOutlineClose } from "react-icons/ai";

export default function Sidebar({ sideBar, setSideBar }: any) {

  return (
    
        <div className={style.background}>
          <AiOutlineClose onClick={() => setSideBar(!sideBar)} />
        </div>
  );
}
