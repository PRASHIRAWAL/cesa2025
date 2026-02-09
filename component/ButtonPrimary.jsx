import React from "react";
import Link from "next/link";

const Button = ({ text, route, variant = "primary", ...props }) => {
  const baseClass =
    "px-8 py-4 rounded-3xl font-semibold transition-all duration-300 shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2";

  const variants = {
    primary: `
      bg-gradient-to-r from-[#1C1528] to-[#2A1F3D] 
      text-white border border-[#A78BFA]/30 
      hover:from-[#2A1F3D] hover:to-[#3B1E65] 
      shadow-lg hover:shadow-purple-500/30 
      focus:ring-purple-500 cursor-pointer
    `,
    secondary: `
      bg-[#2A1F3D] text-white border border-[#A78BFA]/30 
      hover:bg-[#3B1E65] hover:border-[#C4B5FD] 
      shadow-md hover:shadow-purple-400/20 
      focus:ring-purple-500 cursor-pointer
    `,
    primaryBlue: `
      bg-gradient-to-r from-[#0B1B34]/30 to-[#122B4D] 
      text-white border border-[#60A5FA]/30 
      hover:from-[#122B4D] hover:to-[#1B3A67]/20 
      shadow-lg hover:shadow-blue-500/30 
      focus:ring-blue-500 cursor-pointer
    `,
    secondaryBlue: `
      bg-[#122B4D]/40 text-white border border-[#60A5FA]/30 
      hover:bg-[#1B3A67]/40 hover:border-[#93C5FD] 
      shadow-md hover:shadow-blue-400/20 
      focus:ring-blue-500 cursor-pointer
    `,
  };

  const buttonClass = `${baseClass} ${variants[variant]}`;

  if (route) {
    return (
      <Link href={route} className={buttonClass} {...props}>
        {text}
      </Link>
    );
  }

  return (
    <button className={buttonClass} {...props}>
      {text}
    </button>
  );
};

export default Button;
