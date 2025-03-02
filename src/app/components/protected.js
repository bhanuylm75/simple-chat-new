"use client";

import { useSession } from "next-auth/react";
import { redirect,useRouter } from "next/navigation";
import { useEffect } from "react";

const ProtectedRoute = ({ children }) => {
  const { data: session, status } = useSession();
  const router = useRouter();
  console.log(session)
  useEffect(() => {
    if (status === "unauthenticated") {
      router?.push("/"); // Redirect to login if not authenticated
    }
  }, [status,router]);

  

  return session ? children : null;
};

export default ProtectedRoute;
