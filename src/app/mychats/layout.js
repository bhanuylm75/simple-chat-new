import ProtectedRoute from "../lib/protectedroute";

export default async function DashboardLayout({ children}) {
  
  return (
    <div className=" bg-gray-100 h-full  lg:pr-0    pt-4 pb-4 flex flex-row w-full">

         <div className="w-full " >
         <>
        <ProtectedRoute>{children}</ProtectedRoute>
         </>
         </div>
     
      </div>
  );
}
