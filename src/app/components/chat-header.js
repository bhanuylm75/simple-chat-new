"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import getChatPartner from "../lib/getchatpatner";
import getLocalUser from "../lib/getuserdata"; // Assume it returns a promise that resolves with data
const a=getLocalUser()
const b=JSON.parse(JSON.stringify(a))

const Chatheader = ({ chatid }) => {
  const [chatPartner, setChatPartner] = useState(null);
  const [userid, setuserid] = useState(b?.id)
  const [userId1, userId2] = chatid.split('--')
  const chatpartnerid = userId1 === userid? userId2 : userId1


  
  useEffect(() => {
    async function fetchChatPartner() {
      try {
        const partnerData = await getChatPartner(chatid);
        setChatPartner(partnerData);
      } catch (error) {
        console.error("Error fetching chat partner data:", error);
      }
    }
    if (chatid) {
      fetchChatPartner();
    }
  }, [chatid]);

  useEffect(() => {
    if (chatPartner && chatPartner._id) {
      async function addToMyChats() {
        try {
          const response = await axios.post("http://localhost:3002/mychats", {
            userid,
            chatPartner,
          });
          console.log("Chat created response:", response.data);
        } catch (error) {
          console.error("Error creating chat:", error);
        }
      }
      addToMyChats();
    }
  }, [chatid, chatPartner]);
  

  

  return (
    <div className="flex sm:items-center cursor-pointer pl-4 justify-between py-3 border-b border-gray-200">
      <div className="relative flex items-center space-x-4">
        <div className="relative">
          <div className="relative w-6 sm:w-12 h-6 sm:h-12">
            <img
              src="https://i.pravatar.cc/150?img=3"
              alt="Chat Partner"
              className="rounded-full"
            />
          </div>
        </div>
        <div className="flex flex-col leading-tight">
          <div className="text-lg flex items-center">
            <span className="text-gray-700 mr-3 font-semibold">
              {chatPartner ? chatPartner.name : "Loading..."}
            </span>
          </div>
          <span className="text-sm text-gray-600">
            {chatPartner ? chatPartner.email : ""}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Chatheader;
