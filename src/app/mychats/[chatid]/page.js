//"use client"

import Image from 'next/image'

import Messages from "@/app/components/messages";
import Chatheader from "@/app/components/chat-header";
import axios from "axios";




const page = async ({params}) => {
  const { chatid } = await params;
  
 
  //console.log(initialMessages)

  
  
  
  return (
    <div className='bg-white shadow-lg   h-screen md:h-full   flex flex-col w-full '>
      <div className='sticky top-0 bg-white z-20   '>  
        <Chatheader  chatid={chatid}
         /></div>
    
      <Messages chatid={chatid} />
      
   
  
  </div>
)
}
  


export default page
