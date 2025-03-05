"use client";
import React, { useState, useEffect, useRef } from "react";
import { FaSearch, FaArrowLeft } from "react-icons/fa";
import axios from "axios";
import { useAuth } from "../lib/contextapi";
import { useRouter } from "next/navigation";
import getLocalUser from "../lib/getuserdata";
import Sidebarcontent from "./Sidebarcontent";

const Sidebar = () => {
  const router = useRouter();
  const localUser = getLocalUser();
  const [sessionId, setSessionId] = useState(localUser?.id || "");
  const [isExpanded, setIsExpanded] = useState(false);
  const [users, setUsers] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [mychats, setMyChats] = useState([]);
  const [inputText, setInputText] = useState("");
  const { logout } = useAuth();

  useEffect(() => {
    fetchAllUsers();
    fetchMyChats();
  }, [sessionId]);

  const fetchAllUsers = async () => {
    try {
      const { data } = await axios.get("https://api-chat.treepr.in/api/users");
      const filteredUsers = data.filter((user) => user._id !== sessionId);
      setUsers(filteredUsers);
    } catch (err) {
      console.error("Error fetching users: ", err.message);
    }
  };

  const handleSearch = (e) => {
    const searchValue = e.target.value.toLowerCase();
    setInputText(searchValue);
    const filteredResults = users.filter((user) =>
      user?.name.toLowerCase().includes(searchValue)
    );
    setSearchResults(filteredResults);
  };

  const fetchMyChats = async () => {
    try {
      const response = await axios.get(`http://localhost:3002/mychats/${sessionId}`);
      setMyChats(response?.data);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="bg-white h-full w-full cursor-pointer px-4 pt-4 lg:pt-2 rounded-lg relative shadow-lg flex flex-col">
      <h1 className="text-xl md:text-2xl pb-3 font-bold text-gray-800">Chats</h1>

      {/* Search Bar */}
      <div className="relative flex items-center">
        {isExpanded && (
          <FaArrowLeft
            className="text-black text-2xl cursor-pointer pr-2"
            onClick={() => {
              setIsExpanded(false);
              setSearchResults([]);
              setInputText("");
            }}
          />
        )}
        <FaSearch
          className={`absolute top-1/2 transform -translate-y-1/2 text-gray-400 ${
            isExpanded ? "left-8" : "left-4"
          }`}
        />
        <input
          type="text"
          onChange={(e) => handleSearch(e)}
          onClick={() => setIsExpanded(true)}
          value={inputText}
          placeholder="Search..."
          className={`pl-10 pr-4 py-2 rounded-full border border-gray-300 focus:outline-none transition-all duration-300 w-full`}
        />
      </div>

      {/* User List */}
      <div className="flex-grow overflow-hidden mt-4">
        {!isExpanded ? (
          mychats.length > 0 ? (
            <Sidebarcontent text={"Your chats"} sessionId={sessionId} data={mychats} />
          ) : (
            <Sidebarcontent text={"No active chats. Start a conversation!"} sessionId={sessionId} data={users} />
          )
        ) : searchResults.length > 0 ? (
          <Sidebarcontent sessionId={sessionId} data={searchResults} />
        ) : (
          <p className="text-gray-500 text-center mt-4">No users found</p>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
