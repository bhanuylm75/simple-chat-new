"use client";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import Minibar from "@/app/components/Minibar";
import Sidebar from "@/app/components/Sidebar";

export default function DashboardLayout({ children }) {
  const pathname = usePathname();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024); // lg breakpoint
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isChatList = pathname === "/mychats";
  const isChatDetail = pathname.startsWith("/mychats/");
  console.log("deatisl",isChatDetail)

  return (
    <div className="bg-gray-100 h-full lg:pr-0 pb-4 flex flex-row w-full">
      {/* Minibar always visible innonly home screen */}
      <div className={`w-16 ${
          isMobile && isChatDetail ? "hidden" : "block"
        }`}>
        <Minibar />
      </div>

      {/* Sidebar (always mounted, just hidden when needed) */}
      <div
        className={`w-full mr-2 mt-4 lg:mr-8 lg:w-[38%] ${
          isMobile && isChatDetail ? "hidden" : "block"
        }`}
      >
        <Sidebar />
      </div>

      {/* Children (always mounted, just hidden when needed) */}
      <div
        className={`w-full lg:mt-4 lg:mr-4  m ${
          isMobile && isChatList ? "hidden" : "block"
        }`}
      >
        {children}
      </div>
    </div>
  );
}
