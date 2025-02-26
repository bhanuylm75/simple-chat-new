// useSocket.js
import { useEffect, useState } from "react";
import io from "socket.io-client";

let socket; // Outside variable to ensure a singleton

export  const useSocket = (userId) => {
  const [socketInstance, setSocketInstance] = useState(null);

  useEffect(() => {
    // If no socket exists, create one
    if (!socket) {
      socket = io("http://localhost:3002", {
        // options here if needed
      });
      setSocketInstance(socket);
    } else {
      setSocketInstance(socket);
    }

    // Once the socket is connected, register the user (if provided)
    socket.on("connect", () => {
      console.log("Connected to socket server:", socket.id);
      if (userId) {
        socket.emit("register", userId);
      }
    });

    // Cleanup: Disconnect socket if needed when no components are using it.
    // (If you want to keep it alive, you might remove the disconnect call)
    return () => {
      // For a shared socket, you might not disconnect here
      // socket.disconnect();
    };
  }, [userId]);

  return socketInstance;
};
