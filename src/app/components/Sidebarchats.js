"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { chatHrefConstructor } from "../lib/utils";

// Shimmer loader during fake loading delay
const ShimmerRow = () => (
  <div className="flex items-center gap-4 px-3 py-2 animate-pulse">
    <div className="w-12 h-12 bg-gray-300 rounded-full" />
    <div className="flex-1 space-y-2">
      <div className="w-1/2 h-4 bg-gray-300 rounded" />
      <div className="w-1/3 h-4 bg-gray-200 rounded" />
    </div>
  </div>
);

// Renders the user list
const ListUsers = ({ users, sessionId }) => (
  <div className="">
    {users.map((user) => (
      <Link href={`/mychats/${chatHrefConstructor(sessionId, user._id)}`} key={user._id}>
        <div className="flex h-[70px] items-center shadow-sm gap-4 border-b last:border-none lg:hover:bg-gray-100 transition rounded-lg">
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
    ))}
  </div>
);

// Main component
const Sidebarchats = ({ sessionId, data,text }) => {
  const [loading, setLoading] = useState(true);

  // Simulate a loading effect like Groups does
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 500); // optional delay
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex px-2 flex-1 flex-col pb-2">
      <span>{text}</span>
      <div className="flex-1 overflow-y-auto w-full max-w-xl mx-auto hide-scrollbar">
        {loading ? (
          <div className="w-full space-y-3">
            {[...Array(6)].map((_, i) => (
              <ShimmerRow key={i} />
            ))}
          </div>
        ) : (
          <ListUsers users={data} sessionId={sessionId} />
        )}
      </div>
    </div>
  );
};

export default Sidebarchats;
