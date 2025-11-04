import { useState } from "react";

export default function LoginForm({ username, setUsername, handleNavigate}) {

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!username.trim()) return;    

    try {
     
      await fetch("http://127.0.0.1:5000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username }),
      });

      handleNavigate(username)
      
    } catch (err) {
      console.error(err);
      
    } finally {
      
    }
  };

  return (
    <form onSubmit={handleLogin} className="flex space-x-2 ">
      <input
        
        type="text"
        placeholder="Enter Last.fm username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="flex-1 px-3 py-2 rounded-md  text-white placeholder-gray-400  text-sm"
        
      />
      <button 
      type="submit" 
      className="px-3 py-2 rounded-md bg-gray-600 text-gray-100 
                   hover:bg-gray-500 active:bg-gray-700 
                   transition-colors text-sm font-mono">
        {"Get Tracks"}

      </button>
      
    </form>
  );
}