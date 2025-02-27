
import Auth from "./components/Auth";


export default async function Home() {
  
  
  const session = await getServerSession(authOptions);
  //console.log(session)
  
  return (
    <div>
      <Auth/>
  
      
    </div>
  );
}
