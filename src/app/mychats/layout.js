import Minibar from "@/app/components/Minibar";
import Sidebar from "@/app/components/Sidebar";

import { getServerSession } from 'next-auth'
import { authOptions } from "../api/auth/[...nextauth]/route";

export default async function DashboardLayout({ children}) {
  const session = await getServerSession(authOptions)
 
  return (
    <div className=" bg-gray-100  lg:pt-5 lg:pb-2 h-screen flex flex-row w-[100%]">
      <div className="w-16">
      <Minibar/>
      </div>
         <div className="w-[95%]">
          {children}
         </div>
     
      </div>
  );
}
