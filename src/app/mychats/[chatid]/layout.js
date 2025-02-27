import Minibar from "@/app/components/Minibar";
import Sidebar from "@/app/components/Sidebar";


export default async function DashboardLayout({ children }) {
 
  return (
   <div className="h-full flex flex-row">
    <div className="w-[32%] hidden lg:flex">
        <Sidebar/>
        </div>
    <div className="w-full  lg:w-[95%] lg:ml-2 lg:mr-5">
    {children}
    </div>
   </div>
  );
}
