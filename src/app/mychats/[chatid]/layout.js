import Minibar from "@/app/components/Minibar";
import Sidebar from "@/app/components/Sidebar";
//import Minibar from "@/app/components/Minibar";

export default async function DashboardLayout({ children }) {
 
  return (
   <div className="h-full w-full flex flex-row ">
     <div className="hidden md:flex w-16">
      <Minibar/>
      </div>
    <div className=" md:w-[35%] lg:w-[28%] hidden md:flex">
        <Sidebar/>
        </div>
    <div className="  m-0 w-full md:w-[56%] lg:w-[65%]  lg:ml-2 ">
    {children}
    </div>
   </div>
  );
}
