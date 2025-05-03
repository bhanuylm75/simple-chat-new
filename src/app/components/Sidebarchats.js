"use client"
import { FixedSizeList as List } from "react-window";
import Link from "next/link";
import { useState,useEffect } from "react";
import { chatHrefConstructor } from "../lib/utils";

// Generate dummy users
const generateDummyUsers = (count) => {
  return Array.from({ length: count }, (_, i) => ({
    _id: `user_${i}`,
    name: `User ${i + 1}`,
  }));
};

const users = generateDummyUsers(1000); // Example with 1000 users

// Each row in the list (a single user card)
const Row = ({ index, style, data }) => {
  const { users, sessionId } = data; // Extract users and sessionId
  const user = users[index];



  return (
    <Link href={`/mychats/${chatHrefConstructor(sessionId, user._id)}`} key={user._id}>
      <div
        className="flex items-center shadow-sm gap-4 pl-3 border-b last:border-none lg:hover:bg-gray-100 transition rounded-lg"
        style={style}
      >
        <img
          src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.name}`}
          alt={user.name}
          className="w-12 h-12 rounded-full object-cover"
        />
        <div>
          <p className="text-lg font-semibold text-gray-800">{user.name}</p>
        </div>
      </div>
    </Link>
  );
};

const Sidebarchats = ({ text, data, sessionId }) => {

  const [height, setHeight] = useState(400); // Initial height is 400px

  useEffect(() => {
    // This will run ONLY after the component has mounted on the client
    const isMobile = window.innerWidth < 640;
    setHeight(isMobile ? 460 : 400); // Dynamically update height based on window width
  }, []); // Empty dependency array means this runs only once, after mounting

  return (
    <div className="flex  w-full max-w-xl mx-auto">
    <List
      //height={window.innerWidth < 640 ? 460 : 400}
      height={height}
      className="scrollbar-hidden"
      itemData={{ users: data, sessionId }}
      itemCount={data.length}
      itemSize={70}
      width="100%"
    >
      {Row}
    </List>
  </div>
  );
};

export default Sidebarchats;
