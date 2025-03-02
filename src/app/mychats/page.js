import ChatInput from '../components/Chatinput';
import Sidebar from '../components/Sidebar';
import Minibar from '../components/Minibar';


const Page = async () => {
  
  return (
    <div className=' bg-white-950   flex  w-full flex-row  h-full '>
       <div className="w-16">
      <Minibar/>
      </div>
      <div className="w-full lg:w-[28%]  ">
        <Sidebar/>
        </div>
    </div>
  );
}

export default Page;
