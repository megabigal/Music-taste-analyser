import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";


import TrackTable from "../components/TrackTable";
import Dropdown from "../components/DropDown";
export default function Dashboard({ username }) {
  const [limit, setLimit] = useState(10);   
  const [timeFrame, setTimeFrame] = useState("overall") 
  const [tracks, setTracks] = useState([]);    
  const [theme, setTheme] = useState("default")
  const [loading, setLoading] = useState(false)
  
  let navigate = useNavigate(); 
  
  const backToLogin = () => {
    navigate("/")
  }
  const updateTable = () =>{ //called when submit is pressed
    setLoading(true)
    const fetchData = async () => {
      try {
        const res = await fetch(
          `http://127.0.0.1:5000/api/trackData?username=${username}&limit=${limit}&timeframe=${timeFrame}`
        );
        let data = await res.json()
        setTracks(data);
      }
      catch (err){
        console.error("cant get track")
      }
      finally{
        setLoading(false)
      }
      
    }
    fetchData()
    
  }



  return (
    
    <div className="relative flex justify-center items-start min-h-screen bg-gray-900 p-8">
      
      <button onClick={backToLogin} className=" absolute top-4 left-4 text-white 
      px-3 py-2 rounded-md bg-gray-600 hover:bg-gray-500 active:bg-gray-700 
                   transition-colors text-sm font-mono">
        Return
      </button>
      

      <div className="bg-gray-800 p-6 rounded-lg shadow-lg max-w-5xl overflow-x-auto">
        <div className="flex items-center space-x-4 mb-4">
          <Dropdown
            label="Number of tracks"
            options={["5", "10", "20", "50"]}
            value={limit}
            onChange={(option) => {setLimit(Number(option))}}//convert option to int
          />
          <Dropdown
            label="Timeframe"
            options={["7day", "1month", "3month", "6month", "12month", "overall"]}
            value={timeFrame}
            onChange={(option) => {setTimeFrame(option)}}
          />
          <Dropdown
            label="Theme"
            options={["default", "new","purpleGreen","magentaMint","pinkSky","orangeBlue"]}
            value={theme}
            onChange={(option) => {setTheme(option)}}
          />
          <button onClick={updateTable} className="bg-gray-800 text-white px-4 py-2 rounded-lg shadow hover:bg-gray-700 min-w-[120px] flex justify-between items-center">
            filter
          </button>
        </div>
        <h1 className="text-xl font-bold text-white mb-4 text-center">Track Heatmap</h1>
        {loading ? (
          <div className="flex justify-center items-center ">
            <div className="flex justify-center items-center animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"> </div>
          </div>
        ): (
          <TrackTable data={tracks} theme = {theme} />
        )}
      </div>
    </div>
  );
}