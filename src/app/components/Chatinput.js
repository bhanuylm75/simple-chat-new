"use client";
import axios from "axios";
import { useState, useEffect } from "react";
import io from "socket.io-client";
import getchatpatner from "../lib/getchatpatner";
import getLocalUser from "../lib/getuserdata";

let socket; // Declare socket variable outside to avoid reconnects on re-render
const user=getLocalUser()
const ChatInput = ({ chatid }) => {
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [chatpatner, setchatpatner] = useState(null);
  const [userId, setUserId] = useState(user?.id);
  const [messages, setMessages] = useState([]);
  const [userId1, userId2] = chatid.split('--')
  //console.log(userId)



  //console.log(messages)


  useEffect(() => {
      
      async function fetchChatPartner() {
        try {
          const partnerData = await getchatpatner(chatid);
          setchatpatner(partnerData);
        } catch (error) {
          console.error("Error fetching chat partner data:", error);
        }
      }
      fetchChatPartner();
    }, [chatid]);

 
  useEffect(() => {
    //socket = io("http://localhost:3002"); // Replace with your server URL

    // Optionally, listen for acknowledgements or errors
    socket.on("connection", () => {
      console.log("Connected to socket server:", socket.id);
      socket.emit("register", userId);
    });

    socket.on("chat messages", (messageData) => {
      console.log("New message received:", messageData);
      //setMessages((prevMessages) => [...prevMessages, messageData]);
    });

    socket.on("private messages", (data) => {
      console.log("Private message received:", data.chatId);
  if (data.chatId !== chatid) return; // 🔥 THIS LINE FIXES YOUR BUG
  setMessages((prev) => [...prev, data]);
});

    socket.on("error", (err) => {
      console.error("Socket error:", err);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  // Function to send the message via Socket.IO
  const handleSendMessage = async () => {
    if (!input.trim()) return;

    setIsLoading(true);

    const messageData = {
      senderId: userId,
      receiverId: chatpatner._id,
      chatId:chatid,
      text: input,
    };
    
    try {
      // Emit the message to the socket server
      socket.emit("private messages", messageData);
    
      setInput("");
    } catch (error) {
      console.error("Error sending message:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full flex items-center gap-3 p-4 bg-white">
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
        className={`px-4 py-2 bg-blue-500 text-white font-medium rounded-lg shadow-md 
          hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition 
          ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
      >
        {isLoading ? "Sending..." : "Send"}
      </button>
    </div>
  );
};

export default ChatInput;
