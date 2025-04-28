import GroupChats from '@/app/components/Groupchats';
import React from 'react'
import GroupHeader from '@/app/components/groupheader';

const page = async({params}) => {
  const { groupid } = await params;
  console.log(groupid)
  return (
    <div className='bg-white shadow-lg  h-screen lg:h-full   flex flex-col w-full '>
       <div className='sticky top-0 bg-white z-20   '>  
        <GroupHeader  groupId={groupid}
         /></div>
     
    
      <GroupChats groupId={groupid} />
      
   
  
  </div>
  )
}

export default page