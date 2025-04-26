import GroupChats from '@/app/components/Groupchats';
import React from 'react'

const page = async({params}) => {
  const { groupid } = await params;
  console.log(groupid)
  return (
    <div className='bg-white shadow-lg  h-screen lg:h-full   flex flex-col w-full '>
     
    
      <GroupChats groupId={groupid} />
      
   
  
  </div>
  )
}

export default page