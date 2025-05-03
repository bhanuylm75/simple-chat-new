import ChatInput from '../components/Chatinput';
import Sidebar from '../components/Sidebar';
import Minibar from '../components/Minibar';


const Page = async () => {
  
  return (
    <div className=' bg-white-950 pt-4    flex  w-full flex-row  h-full '>
       <div className="w-16">
      <Minibar/>
      </div>
      <div className="w-full  mr-2 lg:mr-0  lg:w-[28%]  ">
        <Sidebar/>
        </div>
        <div className="hidden md:flex w-[69%] justify-center items-center text-center">
  <p>Pick a chat to start a conversation...</p>
</div>

    </div>
  );
}

export default Page;
