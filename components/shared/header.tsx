import Link from "next/link";
import React from "react";
import { FaSpotify } from "react-icons/fa";

const Header = () => {
  return (
    <div className="w-full bg-neutral-800">
      <div className="container min-h-[10vh] flex items-center mx-auto">
        <Link href={"/"} className="group flex items-center space-x-2">
          <FaSpotify
            className="text-green-600 group-hover:text-green-700 transition-all duration-300"
            size={32}
          />
          <span className="text-white text-[24px] font-[600]">MusicApp</span>
        </Link>
      </div>
    </div>
  );
};

export default Header;
