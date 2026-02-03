"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Mail, Lock, User } from "lucide-react";
import { useAuth } from "../lib/contextapi";

const Auth = () => {
  const router = useRouter();
  const [isRegister, setIsRegister] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [message, setMessage] = useState("");
  const { login } = useAuth();

  const validateForm = () => {
    const { email, password, name } = formData;
    if (!email || !password) {
      setMessage("Email and password are required.");
      return false;
    }
    if (isRegister && !name) {
      setMessage("Full name is required for registration.");
      return false;
    }
    setMessage("");
    return true;
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    try {
      const url = isRegister
        ? "https://sky.firm.in/api/register"
        : "https://sky.firm.in/api/login";
      const { data } = await axios.post(url, formData);
      if (data.error) {
        setMessage(data.error);
      } else {
        setMessage(isRegister ? "Registered successfully!" : "Logged in successfully!");
        localStorage.setItem("userData", JSON.stringify(data.user));
        login(data.token);
        router.push("/mychats");
      }
    } catch (error) {
      setMessage(error.response?.data?.message || "Something went wrong.");
    }
  };

  const handleGuestLogin = async () => {
    try {
      const { data } = await axios.post("https://sky.firm.in/api/login", {
        email: "guest@example.com",
        password: "guest123",
      });
      if (data.error) {
        setMessage(data.error);
      } else {
        setMessage("Logged in as guest!");
        localStorage.setItem("userData", JSON.stringify(data.user));
        login(data.token);
        router.push("/mychats");
      }
    } catch (error) {
      setMessage(error.response?.data?.message || "Something went wrong.");
    }
  };

  return (
    <div className="flex flex-col min-h-screen items-center justify-center bg-gradient-to-br from-blue-400 to-purple-600 px-4">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-bold text-center text-gray-800">
          {isRegister ? "Create an Account" : "Welcome Back"}
        </h2>

        {message && <p className="text-center text-red-500 font-medium my-2">{message}</p>}

        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          {isRegister && (
            <div className="flex items-center border border-gray-300 rounded-lg px-3">
              <User className="text-gray-500" size={18} />
              <input
                id="name"
                type="text"
                className="w-full p-2 text-gray-700 focus:outline-none"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleInputChange}
              />
            </div>
          )}
          <div className="flex items-center border border-gray-300 rounded-lg px-3">
            <Mail className="text-gray-500" size={18} />
            <input
              id="email"
              type="email"
              className="w-full p-2 text-gray-700 focus:outline-none"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleInputChange}
            />
          </div>
          <div className="flex items-center border border-gray-300 rounded-lg px-3">
            <Lock className="text-gray-500" size={18} />
            <input
              id="password"
              type="password"
              className="w-full p-2 text-gray-700 focus:outline-none"
              placeholder="Password"
              value={formData.password}
              onChange={handleInputChange}
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg font-semibold hover:bg-blue-600 transition-all"
          >
            {isRegister ? "Sign Up" : "Login"}
          </button>
          <button
            type="button"
            onClick={handleGuestLogin}
            className="w-full bg-gray-300 text-gray-800 py-2 rounded-lg font-semibold hover:bg-gray-400 transition-all"
          >
            Login as Guest
          </button>
        </form>

        <div className="mt-4 text-center text-gray-700">
          {isRegister ? "Already have an account?" : "Don't have an account?"}{" "}
          <button
            onClick={() => {
              setIsRegister(!isRegister);
              setMessage("");
            }}
            className="text-blue-600 font-medium underline"
          >
            {isRegister ? "Login" : "Sign Up"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Auth;
