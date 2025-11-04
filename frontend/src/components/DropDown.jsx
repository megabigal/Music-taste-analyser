import { useState } from "react";

export default function Dropdown({ label, options, value, onChange }) {
    const [open, setOpen] = useState(false);

    const handleSelection = (option) =>{
        onChange(option)
        setOpen(false)
    }

    return (
    <div className="relative inline-block text-left m-2">
      {label && <p className="text-gray-300 mb-1">{label}</p>}

      
      <button
        onClick={() => setOpen(!open)}
        className="bg-gray-800 text-white px-4 py-2 rounded-lg shadow hover:bg-gray-700 min-w-[120px] flex justify-between items-center"
      >
        {value || "Select..."} <span className="ml-2">⌄</span>
      </button>

      
      {open && (
        <div className="absolute mt-2 w-full bg-white rounded-lg shadow-lg z-10">
          {options.map((option, i) => (
            <button
              key={i}
              onClick={() => handleSelection(option)}
              className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
            >
              {option}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}