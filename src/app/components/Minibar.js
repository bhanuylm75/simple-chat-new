"use client";
import { useState } from "react";
import Link from "next/link";
import { FaComments, FaSignOutAlt } from "react-icons/fa";

const Minibar = () => {
  const [activeIcon, setActiveIcon] = useState(null);

  const handleIconClick = (iconName) => {
    setActiveIcon(iconName);
  };

  return (
    <div className="flex flex-col w-full  max-h-screen justify-between items-center  shadow-md h-screen md:h-full ">
      {/* Icons Container */}
      <div className="flex flex-col justify-center items-center space-y-4 flex-grow">
        {/* Chat Icon */}
        <Link href="/mychats">
          <div
            onClick={() => handleIconClick("chats")}
            className={`flex justify-center items-center p-3 rounded-lg cursor-pointer transition-all duration-300 ${
              activeIcon === "chats" ? "bg-gray-300" : "hover:bg-gray-200"
            }`}
          >
            <FaComments className="text-gray-600 text-2xl" />
          </div>
        </Link>

        {/* Add Friends Icon */}
        <Link href="/addfriends">
          <div
            onClick={() => handleIconClick("add")}
            className={`flex justify-center items-center p-3 rounded-lg cursor-pointer transition-all duration-300 ${
              activeIcon === "add" ? "bg-gray-300" : "hover:bg-gray-200"
            }`}
          >
            <FaComments className="text-gray-600 text-2xl" />
          </div>
        </Link>
      </div>

      {/* Logout Icon (always at bottom, but visible) */}
      <div className="p-3">
        <div
          onClick={() => handleIconClick("logout")}
          className={`flex justify-center items-center p-3 rounded-lg cursor-pointer transition-all duration-300 ${
            activeIcon === "logout" ? "bg-gray-300" : "hover:bg-gray-200"
          }`}
        >
          <FaSignOutAlt className="text-gray-600 text-2xl" />
        </div>
      </div>
    </div>
  );
};

export default Minibar;
