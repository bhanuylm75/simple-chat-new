"use client";

import Link from "next/link";
import axios from "axios";
import { useEffect, useState } from "react";

const ShimmerRow = () => (
  <div className="flex items-center gap-4 px-3 py-2 animate-pulse">
    <div className="w-12 h-12 bg-gray-300 rounded-full" />
    <div className="flex-1 space-y-2">
      <div className="w-1/2 h-4 bg-gray-300 rounded" />
      <div className="w-1/3 h-4 bg-gray-200 rounded" />
    </div>
  </div>
);

const Listgroup = ({ users }) => {
  return (
    <div className="">
      {users?.map((user) => (
        <Link href={`/mychats/groupui/${user._id}`} key={user._id}>
          <div className="flex h-[70px] items-center shadow-sm gap-4  border-b last:border-none lg:hover:bg-gray-100 transition rounded-lg">
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
};

const Groups = ({ sessionId }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
   const fetchGroups = async () => {
  const start = performance.now(); // or use Date.now()

  try {
    const res = await axios.get(
      `https://sky.firm.in/getgroups/${sessionId}`
    );
    const end = performance.now();
    console.log(`fetchGroups took ${(end - start).toFixed(2)} ms`);

    setData(res.data);
    console.log(res);
  } catch (error) {
    const end = performance.now();
    console.error(`fetchGroups failed in ${(end - start).toFixed(2)} ms`);
    console.error("Error fetching groups:", error);
  } finally {
    setLoading(false);
  }
};


    fetchGroups();
  }, []);

  return (
    <div className="flex px-2 flex-1 flex-col pb-2 ">
      <div className="flex-1 overflow-y-auto w-full max-w-xl mx-auto  hide-scrollbar">
        {loading ? (
          <div className="w-full space-y-3">
            {[...Array(6)].map((_, i) => (
              <ShimmerRow key={i} />
            ))}
          </div>
        ) : (
          <Listgroup users={data} />
        )}
      </div>
    </div>
  );
};

export default Groups;
