"use client";
import { useEffect, useRef, useState } from "react";
import io from "socket.io-client";
import getLocalUser from "../lib/getuserdata";
import { cn } from "../lib/utils";
import { format } from "date-fns";
import getchatpatner from "../lib/getchatpatner";

const GroupChats = ({ groupId }) => {
  const [messages, setMessages] = useState([]);
  const [messageText, setMessageText] = useState("");
  const socketRef = useRef(null); // 🔐 store socket here
  const [sessionId, setSessionId] = useState("");
  //const scrollDownRef = useRef(null);
  

  useEffect(() => {
    const user = getLocalUser();
    setSessionId(user.id);
  }, []);

  useEffect(() => {
    // Connect only once
    socketRef.current = io("https://api-chat.treepr.in/");

    // Join the group
    socketRef.current.emit("joinGroup", groupId);

    // Listen for previous messages
    socketRef.current.on("groupMessageHistory", (messages) => {
      setMessages(messages);
    });

    // Listen for new messages
    socketRef.current.on("groupMessage", (message) => {
      console.log("mesage",message)
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      socketRef.current.disconnect();
    };
  }, [groupId]);

  
  

  const handleSendMessage = () => {
    if (messageText.trim() && socketRef.current) {
      socketRef.current.emit("groupMessage", {
        groupId,
        senderId: sessionId,
        text: messageText,
      });
      setMessageText("");
    }
  };

  //console.log(messages)
  return (
    <>
    {/* Scrollable Messages Container */}
    <div
      id="messages"
      className="bg-white h-full flex flex-1 mb-3 pt-28 md:pt-2 flex-col gap-4  pr-3 pl-3 overflow-y-auto scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2"
    >
      {messages.map((message, index) => {
        const isCurrentUser = message.senderId._id === sessionId;
        const hasNextMessageFromSameUser = messages[index - 1]?.senderId === message.senderId;

        return (
          <div key={`${message._id || index}-${message.createdAt}`} className="flex flex-col">
            <div
              className={cn("flex items-end", {
                "justify-end": isCurrentUser,
                "justify-start": !isCurrentUser,
              })}
            >
              {!isCurrentUser && (
                <div className="flex items-end">
                  {!hasNextMessageFromSameUser && (
                    <div className="w-8 h-8 mr-2 flex-shrink-0">
                      <img
                        src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${message.senderId?.name}`}
                        alt="Profile"
                        referrerPolicy="no-referrer"
                        className="rounded-full w-full h-full object-cover"
                      />
                    </div>
                  )}
                </div>
              )}
              <div
                className={cn(
                  "max-w-xs rounded-lg px-4 py-2 text-base break-words relative",
                  {
                    "bg-indigo-600 text-white": isCurrentUser,
                    "bg-gray-200 text-gray-900": !isCurrentUser,
                    "rounded-br-none": hasNextMessageFromSameUser && isCurrentUser,
                    "rounded-bl-none": hasNextMessageFromSameUser && !isCurrentUser,
                    "ml-10": !isCurrentUser && hasNextMessageFromSameUser,
                  }
                )}
              >
                {message.text}
                
              </div>
            </div>
          </div>
        );
      })}
      <div />
    </div>

    {/* Fixed Input Section */}
    <div className="sticky bottom-0   w-full    z-20  ">
    <div className="  flex items-center w-full pt-0 gap-3 px-3 pb-3  ">
      <textarea
        className="flex-grow w-full resize-none border rounded-lg p-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400"
        rows={1}
        value={messageText}
        onChange={(e) => setMessageText(e.target.value)}
        placeholder="Type your message..."
        //disabled={isLoading}
        
      />
      <button
        onClick={handleSendMessage}
        //disabled={isLoading}
        className="px-4 py-2 bg-blue-500 text-white font-medium rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
      >
        send
      </button>
    </div>
    </div>
  </>
   
  );
};

export default GroupChats;
