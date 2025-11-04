
//document.addEventListener("DOMContentLoaded", () => {
  //  colourTableCells("musicTable");
//});
function clamp(val) {
  return Math.max(0, Math.min(1, val));
}
function getColour(val){
    val = Math.pow(val,0.4)
    let r = 255 *(1-val);
    let g = Math.min(255,(val * 255));
    return `rgb(${r}, ${g},0)`;
}

function colourTableCells(tableID){
    
    let cells = document.querySelectorAll(`#${tableID} td`);
    cells.forEach(cell => {
        let val = parseFloat(cell.textContent);
        let colour =  getColour(val)
        console.log(colour);
        cell.style.backgroundColor = colour; 
        })
    }

colourTableCells('musicTable');