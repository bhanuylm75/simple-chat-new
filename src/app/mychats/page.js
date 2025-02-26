import ChatInput from '../components/Chatinput';
import Sidebar from '../components/Sidebar';
import { authOptions } from '../api/auth/[...nextauth]/route';
import { getServerSession } from 'next-auth';
//import { useEffect, useState } from "react";
import io from "socket.io-client";
import getLocalUser from '../lib/getuserdata';

const Page = async () => {
  //const session = await getServerSession(authOptions);
 

 
  
  return (
    <div className=' bg-white-950 flex h-full flex-row  '>
      <div className="w-full lg:w-[28%]  ">
        <Sidebar/>
        </div>
    </div>
  );
}

export default Page;
