"use client";
import { useAuth } from "./contextapi";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const ProtectedRoute = ({ children }) => {
  const { token } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!token) {
      router.push("/");
    }
  }, [token, router]);

  if (!token) return null;

  return children;
};

export default ProtectedRoute;
