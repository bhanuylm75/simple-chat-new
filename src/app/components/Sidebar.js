"use client"
import React, { useState, useEffect } from "react";
import { FaSearch, FaArrowLeft } from "react-icons/fa";
import axios from "axios";
import Link from "next/link";
import { chatHrefConstructor } from "../lib/utils";
import getLocalUser from "../lib/getuserdata";

const Sidebar = () => {
  const localUser = getLocalUser();
  const [sessionId, setSessionId] = useState(localUser?.id || "");
  const [isExpanded, setIsExpanded] = useState(false);
  const [users, setUsers] = useState([]);
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    fetchAllUsers();
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
    const filteredResults = users.filter((user) => user?.name.toLowerCase().includes(searchValue));
    setSearchResults(filteredResults);
  };

  return (
    <div className="bg-white w-full h-screen md:h-full  cursor-pointer px-4 pt-2 rounded-lg relative shadow-lg ">
      <h1 className="text-xl md:text-2xl pb-3 font-bold text-gray-800">Chats</h1>
      
      {/* Search Bar */}
      <div className="relative flex items-center">
        {isExpanded && (
          <FaArrowLeft className="text-black text-2xl cursor-pointer pr-2" onClick={() => setIsExpanded(false)} />
        )}
        
        <FaSearch className={`absolute top-1/2 transform -translate-y-1/2 text-gray-400 ${isExpanded ? "left-8" : "left-4"}`} />
        
        <input
          type="text"
          onChange={handleSearch}
          onClick={() => setIsExpanded(true)}
          placeholder="Search..."
          className={`pl-10 pr-4 py-2 rounded-full border border-gray-300 focus:outline-none transition-all duration-300 ${isExpanded ? "w-[100%]" : "w-[100%]"}`}
        />
      </div>

      {/* User List */}
      <div className="mt-4">
        {isExpanded && searchResults.length > 0 ? (
          searchResults.map((user) => (
            <Link key={user._id} href={`/mychats/${chatHrefConstructor(sessionId, user._id)}`}>
              <div className="flex items-center gap-4 p-2 border-b hover:bg-gray-100 transition shadow-sm rounded-lg">
                <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.name}`} alt={user.name} className="w-12 h-12 rounded-full object-cover" />
                <div>
                  <p className="text-lg font-semibold text-gray-800">{user.name}</p>
                </div>
              </div>
            </Link>
          ))
        ) : (
          <p className="text-gray-500 text-center mt-4">No users found</p>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
