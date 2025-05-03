import { useState } from "react";
import { chatHrefConstructor } from "../lib/utils";
import Sidebarchats from "./Sidebarchats";
import Groups from "./Groups";
import Unread from "./unread";

const tabs=["chats","groups","unread"]

const Sidebarcontent = ({ text, data, sessionId }) => {


  const [activetab,setactivetab]=useState("chats")
  return (
    <div className=" h-full hide-scrollbar">
      <div className="flex flex-row justify-between pb-3">
      {tabs.map((each,i)=>(
        <span className={`cursor-pointer py-2 px-4 transition-all duration-200${activetab===each?  " text-blue-400 font-semibold"
          : "text-gray-500 hover:text-blue-500"}`}  onClick={()=>setactivetab(each)} key={i}>{each}</span>
      ))}
      </div>
     
      {activetab==="chats" &&<Sidebarchats data={data} text={text} sessionId={sessionId}/>}
      
      {activetab==="groups" &&<Groups  sessionId={sessionId}/>}
      {activetab==="unread" &&<Unread  sessionId={sessionId}/>}
    </div>
  );
};

export default Sidebarcontent;
