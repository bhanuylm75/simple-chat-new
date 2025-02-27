
import { db } from "@/app/lib/db";
//import { getServerSession } from "next-auth";
import Image from 'next/image'
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Messages from "@/app/components/messages";
import getchatpatnerid from "@/app/lib/getchatpatner";
import Chatheader from "@/app/components/chat-header";
import axios from "axios";
import ChatInput from "@/app/components/Chatinput";
//import { useEffect } from "react";




const page = async ({params}) => {
  const { chatid } = await params;
  
 
  //console.log(initialMessages)

  
  
  
  return (
    <div className='bg-white shadow-lg w-full flex-1  flex flex-col h-full'>
      <Chatheader chatid={chatid}/>
      <Messages chatid={chatid}/>
    
   
  
  </div>
)
}
  


export default page
