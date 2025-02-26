"use client"
import { useState } from "react";
import Link from "next/link";
import { FaComments, FaSignOutAlt } from "react-icons/fa";

const Minibar = () => {
  const [activeIcon, setActiveIcon] = useState(null);

  const handleIconClick = (iconName) => {
    setActiveIcon(iconName);
  };

  return (
    <div className="  flex flex-col w-full h-full justify-between items-center">
      <div className="flex flex-col justify-center items-center ">
        {/* Icon 1 */}
        <Link  href="/mychats">
          <div
            onClick={() => handleIconClick("add")}
            className={`flex justify-center items-center p-2 mb-2 rounded-md cursor-pointer transition-all duration-300  ${
              activeIcon === "add" ? "bg-gray-200" : "hover:bg-gray-200"
            }`}
          >
            <FaComments style={{ color: "gray", fontSize: "26px", }} />
          </div>
        </Link>

        {/* Icon 2 */}
        <Link href="/addfriends">
          <div
            onClick={() => handleIconClick("chats")}
            className={`flex justify-center items-center p-2 mb-2 rounded-md cursor-pointer transition-all duration-300 ${
              activeIcon === "chats" ? "bg-gray-200" : "hover:bg-gray-200"
            }`}
          >
            <FaComments style={{ color: "gray", fontSize: "26px" }} />
          </div>
        </Link>
      </div>

      {/* Logout Icon */}
      <div className="p-2">
        <div
          onClick={() => handleIconClick("logout")}
          className={`flex justify-center items-center p-2 rounded-md cursor-pointer transition-all duration-300 ${
            activeIcon === "logout" ? "bg-gray-200" : "hover:bg-gray-200"
          }`}
        >
          <FaSignOutAlt style={{ color: "gray", fontSize: "26px" }} />
        </div>
      </div>
    </div>
  );
};

export default Minibar;
