"use client";
import { cn } from "../lib/utils";
import { format } from "date-fns";
import { useSocket } from "../lib/socket-context";
import { useEffect, useRef, useState } from "react";
import getLocalUser from "../lib/getuserdata";
import getchatpatner from "../lib/getchatpatner";
import axios from "axios";


const Messages = ({ chatid, sessionImg }) => {
  const [messages, setMessages] = useState([]);
  const [sessionId, setSessionId] = useState(null);
  const [chatpartner, setChatPartner] = useState(null);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollDownRef = useRef(null);
  const socket=useSocket()
  

  const user = getLocalUser();

  // Set sessionId from the user
  useEffect(() => {
    if (user) {
      setSessionId(user.id);
    }
  }, [user]);

  // Fetch initial messages when chatid changes
  useEffect(() => {
   if (chatid) fetchMessages();
  }, [chatid]);

  const fetchMessages= async ()=>{
    
    try {
        const response = await axios.get(`https://sky.firm.in/api/messages/${chatid}`);
        setMessages(response.data);
      } catch (error) {
        console.error("Error fetching chat messages:", error.message);
      }
    }

  

  // Setup socket connection
  useEffect(() => {
  if (!socket || !chatid) return;


  

  // 1. Define a function to join the room
  const joinRoom = () => {
    console.log("Re-joining chat room:", chatid);
    socket.emit("joinChat", chatid);
    fetchMessages()
  };

  // 2. Join immediately if we are already connected
  if (socket.connected) {
    joinRoom();
  }

  // 3. IMPORTANT: If the phone wakes up and reconnects, join again!
  socket.on("connect", joinRoom);

  // 4. Handle incoming messages
  const handleIncomingMessage = (message) => {
    if (message.chatId !== chatid) return;
    setMessages((prev) => [...prev, message]);
  };

  socket.on("private messages", handleIncomingMessage);

  // 5. Cleanup
  return () => {
    socket.off("connect", joinRoom);
    socket.off("private messages", handleIncomingMessage);
    socket.emit("leaveChat", chatid);
  };
}, [socket, chatid]);
  // Fetch chat partner data when chatid changes
  useEffect(() => {
    async function fetchChatPartner() {
      try {
        const partnerData = await getchatpatner(chatid);
        setChatPartner(partnerData);
      } catch (error) {
        console.error("Error fetching chat partner data:", error);
      }
    }
    if (chatid) fetchChatPartner();
  }, [chatid]);

  // Auto-scroll to bottom when messages update
  useEffect(() => {
    // Check if ref exists, then scroll
    scrollDownRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const formatTimestamp = (timestamp) => {
    try {
      return format(new Date(timestamp), "HH:mm");
    } catch (error) {
      console.error("Invalid timestamp:", timestamp, error);
      return "Invalid time";
    }
  };

  useEffect(() => {
    const handleResize = () => {
      window.scrollTo(0, document.body.scrollHeight);
    };
  
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  

  

  const handleSendMessage = async () => {
    if (!input.trim()) return;
    setIsLoading(true);
    if (!socket) {
    console.log("Socket not ready yet");
    return;
  }

    const messageData = {
      senderId: sessionId,
      receiverId: chatpartner?._id,
      chatId: chatid,
      text: input,
      createdAt: new Date(),
    };

    try {
      socket.emit("private messages", messageData);
      //setMessages((prev) => [...prev, messageData]);
      setInput("");
    } catch (error) {
      console.error("Error sending message:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Scrollable Messages Container */}
      <div
        id="messages"
        className="bg-white h-full flex flex-1 mb-3 pt-28 md:pt-2 flex-col gap-4  pr-3 pl-3 overflow-y-auto scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2"
      >
        {messages.map((message, index) => {
          const isCurrentUser = message.senderId === sessionId;
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
                          src={chatpartner?.image || `https://api.dicebear.com/7.x/avataaars/svg?seed=${chatpartner?.name}`}
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
                  <span className="ml-2 text-xs text-gray-400">
                    {formatTimestamp(message?.createdAt)}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
        <div ref={scrollDownRef} />
      </div>

      {/* Fixed Input Section */}
      <div className="sticky bottom-0 mt-5  w-full  ">
      <div className="  flex items-center w-full pt-0 gap-3 px-3 pb-3  ">
        <textarea
          className="flex-grow w-full resize-none border rounded-lg p-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400"
          rows={1}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
          disabled={isLoading}
          
        />
        <button
          onClick={handleSendMessage}
          disabled={isLoading}
          className="px-4 py-2  bg-blue-500 text-white font-medium rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        >
          {isLoading ? "Sending..." : "Send"}
        </button>
      </div>
      </div>
    </>
  );
};

export default Messages;