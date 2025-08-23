import React from "react";
import { useLocation } from "react-router-dom";

const Footer = () => {
  const location = useLocation();
  const isRecipePage = location.pathname.includes("/generate");
  if (isRecipePage) {
    return null;
  }
  return (
    <div className="w-full  bottom-0 px-4 h-fit py-1  flex flex-row items-center justify-between z-99">
      <p className="text-gray-800 text-xs">
        RECETTE {new Date().getFullYear()} ©
      </p>

      <h3 className="text-gray-800 text-xs">
        POWERED BY{" "}
        <a
          href="https://astralyngroup.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-black hover:text-gray-500"
        >
          <b>ASTRALYN</b>
        </a>
      </h3>
    </div>
  );
};

export default Footer;
