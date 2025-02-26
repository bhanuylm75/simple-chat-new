// utils/localUser.js
export default function getLocalUser() {
  if (typeof window === "undefined") return null; // Ensure code runs only in the browser
  const userData = localStorage.getItem("userData");
  //console.log("from local",userData);
  return userData ? JSON.parse(userData) : null;
}
