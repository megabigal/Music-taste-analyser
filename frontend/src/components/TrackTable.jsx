export default function TrackTable({ data , theme}) {
  console.log(theme)
  const colourThemes = {
  default: {
    start: [255,0,0],
    end: [0,255,0]
  },
  new: {
    start:[31, 41, 55],
    end: [0,200,200]
  },
  purpleGreen: {
    start: [180, 0, 180],   
    end: [0, 200, 0],   
  },
  magentaMint: {
    start: [255, 0, 150],   
    end: [0, 255, 180],     
  },
  orangeBlue: {
    start: [255, 120, 0],   
    end: [30, 144, 255],    
  },
  pinkSky: {
    start: [255, 105, 180], 
    end: [135, 206, 250],   
  },

}
function getColour(val,theme){
    
    const {start, end}= colourThemes[theme]
    
    val = Math.pow(val,0.4)
    const r = Math.round(start[0] + (end[0] - start[0]) * val);
    const g = Math.round(start[1] + (end[1] - start[1]) * val);
    const b = Math.round(start[2] + (end[2] - start[2]) * val);
    return `rgb(${r}, ${g},${b})`;
}
  if (!data) {
    return <p className="text-white text-center">Loading...</p>;
  }
  const songs = data.map((row) => row.index);

  return (
    <div className="overflow-x-auto max-w-5xl mx-auto">
      <table className="table-auto border-collapse text-sm">
        <thead>
          <tr>
            <th className="border px-2 py-1 bg-gray-700 text-white">Song</th>
            {songs.map((song) => (
              <th key={song} className="border px-2 py-1 bg-gray-700 text-white whitespace-nowrap">
                {song}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr key={row.index}>
              <td className="border px-2 py-1 bg-gray-700 text-white font-bold whitespace-nowrap">
                {row.index}
              </td>
              {songs.map((colSong) => {
                const value = row[colSong];
                

                return (
                  <td
                    key={colSong}
                    className="border px-2 py-1 text-center text-white"
                    style={{ backgroundColor: getColour(value, theme) }}
                  >
                    {value.toFixed(6)}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}