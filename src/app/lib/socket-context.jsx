"use client";
import { createContext, useContext, useEffect, useState } from "react";
import io from "socket.io-client";
import getLocalUser from "../lib/getuserdata";

const SocketContext = createContext(null);

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const newSocket = io("https://sky.firm.in/");
    setSocket(newSocket);

    const user = getLocalUser();
    if (user?.id) {
      newSocket.emit("register", user.id);
    }

    return () => {
      newSocket.disconnect();
    };
  }, []); // Only runs once on mount

  return (
    <SocketContext.Provider value={socket}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => useContext(SocketContext);