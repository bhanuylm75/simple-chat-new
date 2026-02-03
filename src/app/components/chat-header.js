"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import axios from "axios";
import getChatPartner from "../lib/getchatpatner";

const Chatheader = ({ chatid }) => {
  const [chatPartner, setChatPartner] = useState(null);
  const router = useRouter();

  // Fetch user from localStorage
  const user = typeof window !== "undefined" ? JSON.parse(localStorage.getItem("userData")) : null;

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
    if (chatPartner && chatPartner._id && user) {
      async function addToMyChats() {
        try {
          await axios.post("https://sky.firm.in/addtomychats", {
            user,
            chatPartner,
            chatid,
          });
        } catch (error) {
          console.error("Error adding chat:", error);
        }
      }
      addToMyChats();
    }
  }, [chatid, chatPartner, user]);

  // Generate avatar based on name
  const generateAvatar = (name) => {
    return `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=random&color=ffffff&size=128`;
  };

  return (
    <div className="flex items-center bg-white w-full lg:px-4 py-3 border-b border-gray-200 shadow-sm">
      {/* Back Button - Only visible on Mobile */}
      <button
        onClick={() => router.push("/mychats")}
        className="md:hidden flex items-center justify-center p-2 rounded-full hover:bg-gray-100 transition"
      >
        <ArrowLeft className="w-6 h-6 text-gray-600" />
      </button>

      <div className="relative flex items-center space-x-4">
        <div className="relative w-10 sm:w-12 h-10 sm:h-12">
          <img
            src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${chatPartner?.name}`}
            alt="Chat Partner"
            className="rounded-full border border-gray-300 shadow-sm"
          />
        </div>
        <div className="flex flex-col leading-tight">
          <span className="text-lg font-semibold text-gray-800">
            {chatPartner ? chatPartner.name : "Loading..."}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Chatheader;
