import Minibar from "@/app/components/Minibar";
import Sidebar from "@/app/components/Sidebar";



export default async function DashboardLayout({ children}) {
  
  return (
    <div className=" bg-gray-100 h-full pr-2 lg:pr-0    pt-4 pb-4 flex flex-row w-full">

         <div className="w-full " >
          {children}
         </div>
     
      </div>
  );
}
