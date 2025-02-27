"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

const Auth = () => {
  const router = useRouter();
  const [isRegister, setIsRegister] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");

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
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    try {
      const url = isRegister ? "https://api-chat.treepr.in/api/register" : "https://api-chat.treepr.in/login";
      const { data } = await axios.post(url, formData);
      if (data.error) {
        setMessage(data.error);
      } else {
        setMessage(isRegister ? "Registered successfully!" : "Logged in successfully!");
        localStorage.setItem("userData", JSON.stringify(data.user));
        if (!isRegister) localStorage.setItem("token", data.token);
      }
    } catch (error) {
      setMessage(error.response?.data?.message || "Something went wrong.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md border border-gray-200">
        <h2 className="text-3xl font-semibold mb-6 text-gray-800 text-center">
          {isRegister ? "Create an Account" : "Welcome Back"}
        </h2>
        {message && <p className="text-center text-red-500 font-medium">{message}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          {isRegister && (
            <div>
              <label htmlFor="name" className="block text-gray-700 font-medium">Full Name</label>
              <input
                id="name"
                type="text"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                placeholder="John Doe"
                value={formData.name}
                onChange={handleInputChange}
              />
            </div>
          )}
          <div>
            <label htmlFor="email" className="block text-gray-700 font-medium">Email Address</label>
            <input
              id="email"
              type="email"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              placeholder="example@email.com"
              value={formData.email}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-gray-700 font-medium">Password</label>
            <input
              id="password"
              type="password"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              placeholder="********"
              value={formData.password}
              onChange={handleInputChange}
            />
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-500 text-white py-3 rounded-lg font-semibold hover:bg-indigo-600 transition-all"
          >
            {isRegister ? "Sign Up" : "Login"}
          </button>
        </form>
        <div className="mt-4 text-center">
          <p className="text-gray-600">
            {isRegister ? "Already have an account?" : "Don't have an account?"}{" "}
            <button
              onClick={() => {
                setIsRegister(!isRegister);
                setMessage("");
              }}
              className="text-indigo-500 font-medium hover:underline"
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
