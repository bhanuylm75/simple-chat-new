"use client";
import { createContext, useContext, useEffect, useState } from "react";
import io from "socket.io-client";
import getLocalUser from "../lib/getuserdata";

const SocketContext = createContext(null);

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);

  // Only runs once on mount

  // Inside SocketProvider.js
useEffect(() => {
  const newSocket = io("https://sky.firm.in/");
  setSocket(newSocket);

  const onConnect = () => {
    const user = getLocalUser();
    if (user?.id) {
      console.log("Socket connected, registering user:", user.id);
      newSocket.emit("register", user.id);
    }
  };

  newSocket.on("connect", onConnect);

  return () => {
    newSocket.off("connect", onConnect);
    newSocket.disconnect();
  };
}, []);

  return (
    <SocketContext.Provider value={socket}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => useContext(SocketContext);