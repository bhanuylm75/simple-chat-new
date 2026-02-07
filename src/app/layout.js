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

    const handler = (data) => {
      console.log("notified",data)
      setToasts((prev) => [
        { id: Date.now(), ...data },
        ...prev,
      ]);
    };

    socket.on("notifications", handler);
    return () => socket.off("notifications", handler);
  }, [socket]);

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
