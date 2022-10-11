// note: tmeplate tag

// read data from file here

// run through algoritm

// generate fake result data
const numRows = 12;
const numBlocks = 3;

var fakeData = [];

for (let i = 0; i < numRows; i++) { // rows
  let row = [];
  
  for (let j = 0; j < numBlocks; j++) { // blocks
    let block = [];

    // randomize number of seats per block
    let max = 7;
    let min = 6;
    const numSeatPerBlock = Math.floor((Math.random() * (max - min + 1))) + min;

    for (let k = 0; k < numSeatPerBlock; k++) {
      let occupied = Math.floor((Math.random() * (1 - 0 + 1))) + 0;
      block.push({
        num: k+(j*numSeatPerBlock),
        sid: occupied ? 999999999 : 0,
        accomodations: []
      });
    } 
    row.push(block);
  }
  fakeData.push(row);
}

// array of seat html components
var seats = [];

// generate seating chart html
for (let i = 0; i < fakeData.length; i++) { // rows
  // row container
  var rowContainDiv = document.createElement('div');
  // rowContainDiv.classList.add('row-container');
  rowContainDiv.style = "width: 100%; height: 50px; border: 3px solid gray; border-bottom: none; display: flex; align-items: center; justify-content: space-between;";
  if (i == fakeData.length - 1) { rowContainDiv.style.borderBottom = "2px solid gray"};
  document.getElementById('graphic-container').appendChild(rowContainDiv);

  // letter
  var letterDiv = document.createElement('div');
  // letterDiv.classList.add('letter');
  letterDiv.style = "width: 30px; padding: 10px; text-align: center;";
  letterDiv.textContent = String.fromCharCode(65 + i);
  rowContainDiv.appendChild(letterDiv);

  // row
  var rowDiv = document.createElement('div');
  // rowDiv.classList.add('row');
  rowDiv.style = "width: 100%; height: 50px; border-left: 2px solid gray; display: flex; align-items: center; justify-content: space-between; padding-left: 0.5%; padding-right: 0.5%;";
  rowContainDiv.appendChild(rowDiv);
  
  for (let j = 0; j < fakeData[i].length; j++) { // blocks
    var blockDiv = document.createElement('div');
    // blockDiv.classList.add('block');
    blockDiv.style = "display: flex;";

    rowDiv.appendChild(blockDiv);

    for (let k = 0; k < fakeData[i][j].length; k++) {
      var seatDiv = document.createElement('div');
      // seatDiv.classList.add('seat');
      seatDiv.style = "width: 40px; height: 30px; border: 2px solid black; margin-left: 1%; margin-right: 1%;";

      const curSeat = fakeData[i][j][k];

      if (curSeat.sid != 0) {
        // seatDiv.classList.add('occupied');
        seatDiv.style.backgroundColor = "cornflowerblue";
      }

      seatDiv.textContent = curSeat.num;
      blockDiv.appendChild(seatDiv);
      seats.push(seatDiv);
    }
  }
}

const exportModal = document.getElementById('export-modal');
const imgWidth = 1200;
const imgHeight = 1000;

const handleExportClick = () => { 
  if (exportModal.style.display === 'none') {
    const canvas = document.createElement('canvas'); 
    const ctx = canvas.getContext('2d');
    canvas.width = imgWidth;
    canvas.height = imgHeight;

    const tempImg = document.createElement('img')
    tempImg.addEventListener('load', onTempImageLoad)
    tempImg.src = 'data:image/svg+xml,' + encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="${imgWidth}" height="${imgHeight}"><foreignObject width="100%" height="100%"><div xmlns="http://www.w3.org/1999/xhtml">${document.getElementById('graphic-container').innerHTML}</div></foreignObject></svg>`)

    const targetImg = document.createElement('img')
    exportModal.appendChild(targetImg)

    function onTempImageLoad(e){
      ctx.drawImage(e.target, 0, 0)
      targetImg.src = canvas.toDataURL();
    }

    exportModal.style.display = 'block';
  }
  else {
    exportModal.innerHTML = '';
    exportModal.style.display = 'none';
  }
}