"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import axios from "axios";

const GroupHeader = ({ groupId }) => {
  const [groupDetails, setGroupDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    async function fetchGroupDetails() {
      try {
        const response = await axios.get(`https://sky.firm.in/getgroupdetails/${groupId}`);
        setGroupDetails(response.data);
        console.log("groupdetails", response.data)
      } catch (error) {
        console.error("Error fetching group details:", error);
      } finally {
        setLoading(false);
      }
    }
    if (groupId) {
      fetchGroupDetails();
    }
  }, [groupId]);

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
        {loading ? (
          <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gray-300 rounded-full animate-pulse" />
        ) : (
          <div className="relative w-10 sm:w-12 h-10 sm:h-12">
            <img
              src={`https://api.dicebear.com/7.x/identicon/svg?seed=${groupDetails?.name}`}
              alt="Group Avatar"
              className="rounded-full border border-gray-300 shadow-sm"
            />
          </div>
        )}
        <div className="flex flex-col leading-tight">
          {loading ? (
            <div className="h-4 bg-gray-300 rounded w-32 animate-pulse mb-1"></div>
          ) : (
            <>
              <span className="text-lg font-semibold text-gray-800">
                {groupDetails?.name}
              </span>
              {groupDetails?.description && (
                <span className="text-sm text-gray-600">{groupDetails.description}</span>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default GroupHeader;
