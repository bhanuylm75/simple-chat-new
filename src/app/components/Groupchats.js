"use client";
import { useEffect, useRef, useState } from "react";
import io from "socket.io-client";
import getLocalUser from "../lib/getuserdata";
import { cn } from "../lib/utils";
import { format } from "date-fns";
import axios from "axios";

const GroupChats = ({ groupId }) => {
  const [messages, setMessages] = useState([]);
  const [messageText, setMessageText] = useState("");
  const socketRef = useRef(null);
  const [sessionId, setSessionId] = useState("");
  const scrollDownRef = useRef(null);

  useEffect(() => {
    const user = getLocalUser();
    setSessionId(user.id);
  }, []);

  useEffect(() => {
    socketRef.current = io("https://api-chat.treepr.in");
    socketRef.current.emit("joinGroup", groupId);

    socketRef.current.on("groupMessage", (message) => {
      setMessages((prev) => [...prev, message]);
    });

    return () => {
      socketRef.current.disconnect();
    };
  }, [groupId]);

  useEffect(() => {
    const getMessages = async () => {
      const data = await fetchGroupMessages(groupId);
      setMessages(data);
    };
    getMessages();
  }, [groupId]);

  useEffect(() => {
    scrollDownRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

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

  const fetchGroupMessages = async (groupId) => {
    try {
      const response = await axios.get(
        `https://api-chat.treepr.in/group-messages/${groupId}`
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching group messages:", error);
      return [];
    }
  };

  return (
    <>
      {/* Scrollable Messages Container */}
      <div
         className="bg-white h-full flex flex-1 mb-3 pt-28 md:pt-2 flex-col gap-4  pr-3 pl-3 overflow-y-auto scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2"
        id="messages"
      >
        {messages.map((message, index) => {
          const isCurrentUser = message.senderId._id === sessionId;
          const hasPrevSameUser =
            messages[index - 1]?.senderId?._id === message.senderId._id;

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
                    {!hasPrevSameUser && (
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
                    "max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg rounded-lg px-4 py-2 text-base break-words relative",
                    {
                      "bg-indigo-600 text-white": isCurrentUser,
                      "bg-gray-200 text-gray-900": !isCurrentUser,
                      "rounded-br-none": hasPrevSameUser && isCurrentUser,
                      "rounded-bl-none": hasPrevSameUser && !isCurrentUser,
                      "ml-10": !isCurrentUser && hasPrevSameUser,
                    }
                  )}
                >
                  {/* Name for others only */}
                  {!isCurrentUser && !hasPrevSameUser && (
                    <p className="text-xs text-gray-500 mb-1">{message.senderId?.name}</p>
                  )}
                  {/* Message and Time in same row */}
                  <div className="flex justify-between items-center gap-2">
                    <span className="break-words">{message.text}</span>
                    <span className="text-xs text-gray-400 whitespace-nowrap ml-2">
                      {format(new Date(message.createdAt), "p")}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
        <div ref={scrollDownRef} />
      </div>

      {/* Fixed Input Section */}
      <div className="sticky bottom-0 w-full z-20 bg-white">
        <div className="flex items-center w-full gap-3 px-3 pb-3">
          <textarea
            className="flex-grow w-full resize-none border rounded-lg p-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400"
            rows={1}
            value={messageText}
            onChange={(e) => setMessageText(e.target.value)}
            placeholder="Type your message..."
          />
          <button
            onClick={handleSendMessage}
            className="px-4 py-2 bg-blue-500 text-white font-medium rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          >
            Send
          </button>
        </div>
      </div>
    </>
  );
};

export default GroupChats;
