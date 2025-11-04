import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import Dashboard from "./pages/DashboardPage";

export default function App() {
  const [username, setUsername] = useState([]);

  return (
    
      <Routes>
        <Route path="/" element={<LoginPage username={username} setUsername={setUsername} />} />
        <Route path="/dashboard/:username" element={<Dashboard username={username} />} />
      </Routes>
    
  );
}