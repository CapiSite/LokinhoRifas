import { BsWhatsapp, BsInstagram } from "react-icons/bs";
import { FaFacebookF } from "react-icons/fa";

export default function TopHeader() {
  return (
    <>
      <div className="flex">
        <div className="flex bg-use-red w-1/3 h-12 justify-center  border-b-[48px] border-r-[8px] border-b-use-red border-r-white border-solid ">
          <p className="text-white font-Montserrat mt-3 font-medium">
            LOKINHORIFAS@GMAIL.COM
          </p>
        </div>
        
        <div className="flex bg-white h-12 w-1 break-before-page"></div>
        <div className="w-2/3 bg-use-strong-red h-12 flex justify-end items-center z-1 border-t-[48px] border-l-[8px] border-t-use-strong-red border-l-white border-solid">
          <div className="w-8 h-8 bg-use-red rounded-full flex items-center justify-center mb-12 mr-3">
            <FaFacebookF className="text-white bg-use-red text-xl " />
          </div>
          <div className="w-8 h-8 bg-use-red rounded-full flex items-center justify-center mb-12 mr-3">
            <BsInstagram className="text-white bg-use-red text-xl" />
          </div>
          <div className="w-8 h-8 bg-use-red rounded-full flex items-center justify-center mb-12 mr-20">
            <BsWhatsapp className="text-white bg-use-red text-xl" />
          </div>
        </div>
      </div>
    </>
  );
}
