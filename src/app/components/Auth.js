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
      if (isRegister) {
        // Registration flow
        const { data } = await axios.post("http://localhost:3002/api/register", formData);
        setMessage(data.message || "Registered successfully!");
        localStorage.setItem("userData", JSON.stringify(data.user));
      } else {
        // Login flow: using /login API
        const { data } = await axios.post("http://localhost:3002/login", formData);
        if (data.error) {
          setMessage(data.error);
        } else {
          setMessage("Logged in successfully!");
          localStorage.setItem("userData", JSON.stringify(data.user));
          localStorage.setItem("token", data.token);
          //router.push("/dashboard");
        }
      }
    } catch (error) {
      setMessage(error.response?.data?.message || "Something went wrong.");
    }
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">
        {isRegister ? "Register" : "Login"}
      </h2>
      {message && <p className="text-center text-red-500">{message}</p>}
      <form onSubmit={handleSubmit}>
        {isRegister && (
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700 font-medium">
              Full Name
            </label>
            <input
              id="name"
              type="text"
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Enter your full name"
              value={formData.name}
              onChange={handleInputChange}
            />
          </div>
        )}
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 font-medium">
            Email Address
          </label>
          <input
            id="email"
            type="email"
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-gray-700 font-medium">
            Password
          </label>
          <input
            id="password"
            type="password"
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleInputChange}
          />
        </div>
        <button
          type="submit"
          className="w-full bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-600 transition"
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
  );
};

export default Auth;
