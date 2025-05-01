import ProtectedRoute from "../lib/protectedroute";

export default async function DashboardLayout({ children}) {
  
  return (
    <div className=" bg-gray-100 md:pt-4 h-full  lg:pr-0   pb-4 flex flex-row w-full">

         <div className="w-full " >
         <>
        <>{children}</>
         </>
         </div>
     
      </div>
  );
}
