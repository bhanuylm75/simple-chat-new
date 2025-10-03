import { useState } from "react";
import { chatHrefConstructor } from "../lib/utils";
import Sidebarchats from "./Sidebarchats";
import Groups from "./Groups";
import Unread from "./unread";

const tabs=["chats","groups","unread"]

const Sidebarcontent = ({ text, data, sessionId,func }) => {


  const [activetab,setactivetab]=useState("chats")

  const updateactivetab=(each)=>{
    setactivetab(each)
    func() 

  }
  return (
    <div className="flex flex-col h-full overflow-hidden">
  {/* Tab Header */}
  <div className="flex flex-row justify-between pb-3 px-2">
    {tabs.map((each, i) => (
      <span
        key={i}
        className={`cursor-pointer py-2 px-4 transition-all duration-200${
          activetab === each
            ? " text-blue-400 font-semibold"
            : " text-gray-500 hover:text-blue-500"
        }`}
        onClick={() => updateactivetab(each) }
      >
        {each}
      </span>
    ))}
  </div>

  {/* Content area with scroll */}
  <div className="flex-1 h-full overflow-y-auto hide-scrollbar">
    {activetab === "chats" && (
      <Sidebarchats data={data} text={text} sessionId={sessionId} />
    )}
    {activetab === "groups" && <Groups sessionId={sessionId} />}
    {activetab === "unread" && <Unread sessionId={sessionId} />}
  </div>
</div>

  );
};

export default Sidebarcontent;
