"use client "

import { FixedSizeList as List } from "react-window";
import Link from "next/link";
import axios from "axios";
import { useEffect, useState } from "react";

// Skeleton shimmer component
const ShimmerRow = () => (
  <div className="flex items-center gap-4 px-3 py-2 animate-pulse">
    <div className="w-12 h-12 bg-gray-300 rounded-full" />
    <div className="flex-1 space-y-2">
      <div className="w-1/2 h-4 bg-gray-300 rounded" />
      <div className="w-1/3 h-4 bg-gray-200 rounded" />
    </div>
  </div>
);

// Actual user row
const Row = ({ index, style, data }) => {
  const { users, sessionId } = data;
  const user = users[index];

  return (
    <Link href={`/mychats/groupui/${user._id}`} key={user._id}>
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

const Groups = ({ sessionId }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state
  const [height, setHeight] = useState(400); // Initial height is 400px

  useEffect(() => {
    // This will run ONLY after the component has mounted on the client
    const isMobile = window.innerWidth < 640;
    setHeight(isMobile ? 460 : 400); // Dynamically update height based on window width
  }, []); // Empty dependency array means this runs only once, after mounting


  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const res = await axios.get(
          `https://api-chat.treepr.in/getgroups/${sessionId}`
        );
        setData(res.data);
      } catch (error) {
        console.error("Error fetching groups:", error);
      } finally {
        setLoading(false); // Done loading
      }
    };

    fetchGroups();
  }, [sessionId]);

  return (
    <div className="flex w-full max-w-xl mx-auto">
      {loading ? (
        <div className="w-full space-y-3">
          {[...Array(5)].map((_, i) => (
            <ShimmerRow key={i} />
          ))}
        </div>
      ) : (
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
      )}
    </div>
  );
};

export default Groups;
