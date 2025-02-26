"use client";
import { signIn } from "next-auth/react";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { db } from "../lib/db"; // Redis connection

const  GoogleLogin =  () => {
  const { data: session, status } = useSession();
  const router = useRouter();
 console.log(session)

  // Function to store or update user data in Redis
  const storeOrUpdateUserInRedis = async (userData) => {
    if (!userData || !userData.id) return;

    const userId = userData.id;
    const newLocation = await getNewLocation();
    //console.log(newLocation.latitude, newLocation.longitude);

    try {
      
      const existingUserId = await db.sismember("allusersid", userId);

      if (!existingUserId) {
        // If user does not exist, store user data in the sets
        const userSessionData = {
          email: userData.email,
          name: userData.name,
          image: userData.image,
          id: userData.id,
         
        };

        // Add user ID to the allusersid set
        await db.sadd("allusersid", userId);

        // Add the full session data (including location) to the allusersdata set
        await db.sadd("allusersdata", JSON.stringify(userSessionData));  // Serialize userSessionData
        
        console.log("New user data stored successfully.");
        
      } 
    } catch (error) {
      console.error("Error storing or updating user in Redis:", error.message);
    }
  };

  // Function to get the current location
  const getNewLocation = async () => {
    return new Promise((resolve, reject) => {
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            resolve({ latitude, longitude });
          },
          (error) => {
            console.error("Error getting geolocation:", error.message);
            resolve({ latitude: null, longitude: null }); // If location isn't available, resolve with null values
          }
        );
      } else {
        console.error("Geolocation is not supported by this browser.");
        resolve({ latitude: null, longitude: null });
      }
    });
  };

 
  
  useEffect(() => {
    if (status === "authenticated" && session) {
      // Store or update the user data when authenticated
      storeOrUpdateUserInRedis(session.user);
    }
  }, [status, session]);

  const handleLogin = async () => {
    try {
      const res = await signIn("google");

      if (res?.error) {
        throw new Error(res.error);
      }

      console.log("Login successful");
    } catch (error) {
      console.error("Login error: ", error.message);
    } finally {
      console.log("Login process complete");
    }
  };

  return (
    <div>
      <button onClick={handleLogin}>Login with Google</button>
    </div>
  );
};

export default GoogleLogin;
