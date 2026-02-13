"use client";

import localFont from "next/font/local";
import { useEffect, useState, memo } from "react";
import { useRouter } from "next/navigation";
import { AuthProvider } from "./lib/contextapi";
import { SocketProvider, useSocket } from "./lib/socket-context";
import Notifications from "./components/notifications";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

/* 🔔 Notification listener isolated */
const NotificationLayer = memo(function NotificationLayer() {
  const socket = useSocket();
  const router = useRouter();
  const [toasts, setToasts] = useState([]);
  useEffect(() => {
    if (!socket) return;

    const handleNotifications = (data) => {
      console.log("Notification received:", data);
      
      // FIX 1: Wrap the single object in an array instead of spreading it
      // Add a unique ID so removeToast works correctly
      const newNotification = {
        ...data,
        id: Date.now(), // Unique ID for the UI
      };

      setToasts((prev) => [...prev, newNotification]);
    };

    socket.on("notifications", handleNotifications);

    // FIX 2: Essential cleanup to prevent memory leaks and duplicate listeners
    return () => {
      socket.off("notifications", handleNotifications);
    };
  }, [socket]); // Re-run if socket changes (e.g., on phone unlock)

 

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const clickToast = (t) => {
    if (t.chatId) router.push(`/mychats/${t.chatId}`);
  };

  return (
    <Notifications
      items={toasts}
      onRemove={removeToast}
      onClick={clickToast}
    />
  );
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <AuthProvider>
          <SocketProvider>
            {children}
            {/* 🔔 notifications live here */}
            <NotificationLayer />
          </SocketProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
