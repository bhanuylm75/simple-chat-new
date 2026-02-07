"use client";
import { createContext, useContext, useEffect, useRef } from "react";
import io from "socket.io-client";
import getLocalUser from "../lib/getuserdata";

const SocketContext = createContext(null);

export const SocketProvider = ({ children }) => {
  const socketRef = useRef(null);

  useEffect(() => {
    socketRef.current = io("https://sky.firm.in/");

    const user = getLocalUser();
    if (user?.id) {
      socketRef.current.emit("register", user.id);
    }

    return () => {
      socketRef.current.disconnect();
    };
  }, []);

  return (
    <SocketContext.Provider value={socketRef.current}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => useContext(SocketContext);
