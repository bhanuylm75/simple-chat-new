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
        ? "https://api-chat.treepr.in/api/register"
        : "https://api-chat.treepr.in/api/login";
      const { data } = await axios.post(url, formData);
      if (data.error) {
        setMessage(data.error);
      } else {
        setMessage(isRegister ? "Registered successfully!" : "Logged in successfully!");
        console.log(data)
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
      const { data } = await axios.post("https://api-chat.treepr.in/api/login", {
        email: "guest@example.com",
        password: "guest123",
      });
      if (data.error) {
        setMessage(data.error);
      } else {
        setMessage("Logged in as guest!");
        localStorage.setItem("userData", JSON.stringify(data.user));
        localStorage.setItem("token", data.token);
        router.push("/mychats");
      }
    } catch (error) {
      setMessage(error.response?.data?.message || "Something went wrong.");
    }
  };

  return (
    <div className="flex w-full  justify-center items-center bg-gradient-to-br from-blue-400 to-purple-600 px-4" style={{ minHeight: "100vh" }}>
      <div className="bg-white/10 backdrop-blur-lg p-8 sm:p-10 rounded-2xl shadow-xl w-full max-w-md border border-white/20">
        <h2 className="text-3xl font-bold mb-6 text-white text-center tracking-wide">
          {isRegister ? "Create an Account" : "Welcome Back"}
        </h2>
        {message && <p className="text-center text-red-500 font-medium mb-3">{message}</p>}
        <form onSubmit={handleSubmit} className="space-y-5">
          {isRegister && (
            <div className="relative">
              <User className="absolute left-3 top-3 text-white/60" size={18} />
              <input
                id="name"
                type="text"
                className="w-full pl-10 pr-4 py-2 bg-white/20 text-white placeholder-white/50 border-none rounded-lg focus:ring-2 focus:ring-white focus:outline-none"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleInputChange}
              />
            </div>
          )}
          <div className="relative">
            <Mail className="absolute left-3 top-3 text-white/60" size={18} />
            <input
              id="email"
              type="email"
              className="w-full pl-10 pr-4 py-2 bg-white/20 text-white placeholder-white/50 border-none rounded-lg focus:ring-2 focus:ring-white focus:outline-none"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleInputChange}
            />
          </div>
          <div className="relative">
            <Lock className="absolute left-3 top-3 text-white/60" size={18} />
            <input
              id="password"
              type="password"
              className="w-full pl-10 pr-4 py-2 bg-white/20 text-white placeholder-white/50 border-none rounded-lg focus:ring-2 focus:ring-white focus:outline-none"
              placeholder="Password"
              value={formData.password}
              onChange={handleInputChange}
            />
          </div>
          <button
            type="submit"
            className="w-full bg-white/20 text-white py-3 rounded-lg font-semibold hover:bg-white/30 transition-all shadow-lg hover:shadow-xl"
          >
            {isRegister ? "Sign Up" : "Login"}
          </button>
          <button
            type="button"
            onClick={handleGuestLogin}
            className="w-full bg-white/20 text-white py-3 rounded-lg font-semibold hover:bg-white/30 transition-all shadow-lg hover:shadow-xl"
          >
            Login as Guest
          </button>
        </form>
        <div className="mt-5 text-center">
          <p className="text-white">
            {isRegister ? "Already have an account?" : "Don't have an account?"}{" "}
            <button
              onClick={() => {
                setIsRegister(!isRegister);
                setMessage("");
              }}
              className="text-white font-medium underline"
            >
              {isRegister ? "Login" : "Sign Up"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Auth;
