import { useNavigate } from "react-router-dom";
import { useState } from "react";

import LoginForm from "../components/LoginForm";

export default function LoginPage({ username, setUsername }) {
  const navigate = useNavigate(); //the thing that moves us around
  

  
  const handleNavigate = (username) => {
    navigate(`/dashboard/${username}`); // go to dashboard after login
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#0e0e0e] text-gray-200 font-mono">
      <div className="bg-[#2A2929] p-8 border border-white/20 rounded-lg shadow-md w-96 text-center">
        <h1 className="text-2xl font-bold mb-4">Login</h1>
        <LoginForm 
        username={username}
        setUsername={setUsername}
        handleNavigate = {handleNavigate}
        />
        </div>
    </div>
  );
}