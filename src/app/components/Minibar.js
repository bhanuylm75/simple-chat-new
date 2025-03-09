"use client"
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FaComments, FaSignOutAlt } from "react-icons/fa";
import { useAuth } from "../lib/contextapi";

const Minibar = () => {
  const [activeIcon, setActiveIcon] = useState(null);
  const {logout}=useAuth()
  const router = useRouter();

  const handleIconClick = (iconName) => {
    setActiveIcon(iconName);
  };

  const handleLogout = () => {
    console.log("pp")
    logout();
    router.push("/"); // ✅ Move router logic inside a component
  };

  return (
    <div className="  flex flex-col w-full pt-2 lg:pt:0  h-full justify-between items-center">
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
       
      </div>

      {/* Logout Icon */}
      <div className="p-2">
        <div
          onClick={() => handleLogout()}
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