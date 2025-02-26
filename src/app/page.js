import { db } from "./lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";
import Auth from "./components/Auth";
import Googlelogin from "./components/googlelogin";


export default async function Home() {
  
  
  const session = await getServerSession(authOptions);
  //console.log(session)
  
  return (
    <div>
      <Auth/>
  
      
    </div>
  );
}
