const video = document.getElementById('video');
const virtualIdDiv = document.getElementById('virtual-id');
const timeOfEntryDiv = document.getElementById('time-of-entry');
const VidDiv = document.getElementById('vid');
const virtualIdTxt = document.getElementById('virtualIdTxt');
const timeOfEntryTxt = document.getElementById('timeOfEntryTxt');
const learnmorebtn = document.getElementById('learnmorebtn');
const learnmorebtn2 = document.getElementById('learnmorebtn2');
const learnmorebtn3 = document.getElementById('learnmorebtn3');
const learnmorebtn4 = document.getElementById('learnmorebtn4');
const learnmorebtn5 = document.getElementById('learnmorebtn5');
const learnmorebtn6 = document.getElementById('learnmorebtn6');
const learnmorebtn7 = document.getElementById('learnmorebtn7');
const page1 = document.getElementById('page1');
const page2 = document.getElementById('page2');
const page3 = document.getElementById('page3');
const page4 = document.getElementById('page4');
const addItem = document.getElementById('addItem')
const addItem2 = document.getElementById('addItem2')
let personCount = 0;
const recognizedFaces = []; 

let viewportWidth = window.width;

// if (visualViewport = 1280) {
//   video.style.width = '50vw'
// } else if (visualViewport < 1280) {
//   video.style.width = '50vw'
// }

Promise.all([
  faceapi.nets.tinyFaceDetector.loadFromUri('/models'),
  faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
  faceapi.nets.faceRecognitionNet.loadFromUri('/models')
]).then(() => {
  setTimeout(startVideo, 2000); // Delay startVideo by 2 seconds (2000 milliseconds)
});

function startVideo() {
  navigator.getUserMedia(
    { video: {} },
    stream => video.srcObject = stream,
    err => console.error(err)
  );
}

video.addEventListener('play', () => {
  const canvas = faceapi.createCanvasFromMedia(video);
  VidDiv.append(canvas);
  const displaySize = { width: video.width, height: video.height };
  faceapi.matchDimensions(canvas, displaySize);
  setInterval(async () => {
    const detections = await faceapi.detectAllFaces(video, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceDescriptors();
    const resizedDetections = faceapi.resizeResults(detections, displaySize);
    canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
    faceapi.draw.drawDetections(canvas, resizedDetections);
    faceapi.draw.drawFaceLandmarks(canvas, resizedDetections);

    detections.forEach(detection => {
      const descriptor = detection.descriptor;
      const match = findMatch(descriptor);
      if (!match) {
        const virtualId = generateVirtualId();
        const now = new Date();
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const timeOfEntry = `${hours}:${minutes}`;
        recognizedFaces.push({ descriptor, virtualId, timeOfEntry });
        displayVirtualId(virtualId, timeOfEntry);
      } else {
        displayVirtualId(match.virtualId, match.timeOfEntry);
      }
    });
  }, 100);
});

function findMatch(descriptor) {
  return recognizedFaces.find(recognizedFace => faceapi.euclideanDistance(recognizedFace.descriptor, descriptor) < 0.6);
}

function generateVirtualId() {
  const now = new Date();
  const day = String(now.getDate()).padStart(2, '0');
  const month = String(now.getMonth() + 1).padStart(2, '0'); // Months are zero-based
  const year = String(now.getFullYear()).slice(2); // Get last two digits of the year
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  personCount++;

  const formattedPersonCount = String(personCount).padStart(2, '0');

  return `${day}${month}${year}${hours}${minutes}${formattedPersonCount}`;
}

function displayVirtualId(virtualId, timeOfEntry) {
  virtualIdTxt.innerText = `${virtualId}`;
  timeOfEntryTxt.innerText = `${timeOfEntry}`;
}


learnmorebtn.addEventListener('click', function() {
  page1.style.transform = 'translateX(-100%)';
  page2.style.transform = 'translateX(-100%)';
  page3.style.transform = 'translateX(-100%)';
  page4.style.transform = 'translateX(-100%)';
})

learnmorebtn2.addEventListener('click', function() {
  page1.style.transform = 'translateX(0%)';
  page2.style.transform = 'translateX(0%)';
  page3.style.transform = 'translateX(0%)';
  page4.style.transform = 'translateX(0%)';
})

learnmorebtn3.addEventListener('click', function() {
  page1.style.transform = 'translateX(-200%)';
  page2.style.transform = 'translateX(-200%)';
  page3.style.transform = 'translateX(-200%)';
  page4.style.transform = 'translateX(-200%)';
})

learnmorebtn4.addEventListener('click', function() {
  page1.style.transform = 'translateX(0%)';
  page2.style.transform = 'translateX(0%)';
  page3.style.transform = 'translateX(0%)';
  page4.style.transform = 'translateX(0%)';
})

learnmorebtn5.addEventListener('click', function() {
  page1.style.transform = 'translateX(-200%)';
  page2.style.transform = 'translateX(-200%)';
  page3.style.transform = 'translateX(-200%)';
  page4.style.transform = 'translateX(-200%)';
})

learnmorebtn6.addEventListener('click', function() {
  page1.style.transform = 'translateX(-100%)';
  page2.style.transform = 'translateX(-100%)';
  page3.style.transform = 'translateX(-100%)';
  page4.style.transform = 'translateX(-100%)';
})

let orderNumber = 1;

function updateSerialNumbers() {
  const tableBody = document.getElementById('orderTableBody');
  orderNumber = 1; // Reset the order number
  for (let i = 0; i < tableBody.rows.length; i++) {
      tableBody.rows[i].cells[0].textContent = orderNumber++;
  }
}
let orderNumber2 = 1;

function updateSerialNumbers2() {
  const tableBody = document.getElementById('orderTableBody2');
  orderNumber2 = 1; // Reset the order number
  for (let i = 0; i < tableBody.rows.length; i++) {
      tableBody.rows[i].cells[0].textContent = orderNumber2++;
  }
}

addItem.addEventListener('click', () => {
  // Get the input values
  const item = document.getElementById('item').value.trim();
  const quantity = document.getElementById('quantity').value.trim();
  const price = document.getElementById('price').value.trim();

  // Validate inputs
  if (item === '' || quantity === '' || price === '') {
      alert('Please fill out all fields.');
      return;
  }

  // Get the table body
  const tableBody = document.getElementById('orderTableBody');

  // Create a new row
  const newRow = tableBody.insertRow();

  // Insert cells and set their content
  const cell1 = newRow.insertCell(0);
  const cell2 = newRow.insertCell(1);
  const cell3 = newRow.insertCell(2);
  const cell4 = newRow.insertCell(3);
  const cell5 = newRow.insertCell(4);

  // Populate cells with input values
  cell1.textContent = orderNumber++;
  cell2.textContent = item;
  cell3.textContent = quantity;
  cell4.textContent = price;

  // Create a delete button
  const deleteButton = document.createElement('button');
  // deleteButton.textContent = 'Delete';
  deleteButton.className = 'deleteButton';
  deleteButton.innerHTML = '<svg viewBox="0 0 448 512" class="svgIcon"><path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"></path></svg>'
  deleteButton.onclick = function() {
      tableBody.removeChild(newRow);
      updateSerialNumbers();
  };

  // Add the delete button to the last cell
  cell5.appendChild(deleteButton);

  // Clear the inputs
  document.getElementById('item').value = '';
  document.getElementById('quantity').value = '';
  document.getElementById('price').value = '';
})
addItem2.addEventListener('click', () => {
  // Get the input values
  const item = document.getElementById('item2').value.trim();
  const quantity = document.getElementById('quantity2').value.trim();
  const price = document.getElementById('price2').value.trim();

  // Validate inputs
  if (item === '' || quantity === '' || price === '') {
      alert('Please fill out all fields.');
      return;
  }

  // Get the table body
  const tableBody = document.getElementById('orderTableBody2');

  // Create a new row
  const newRow = tableBody.insertRow();

  // Insert cells and set their content
  const cell1 = newRow.insertCell(0);
  const cell2 = newRow.insertCell(1);
  const cell3 = newRow.insertCell(2);
  const cell4 = newRow.insertCell(3);
  const cell5 = newRow.insertCell(4);

  // Populate cells with input values
  cell1.textContent = orderNumber++;
  cell2.textContent = item;
  cell3.textContent = quantity;
  cell4.textContent = price;

  // Create a delete button
  const deleteButton = document.createElement('button');
  // deleteButton.textContent = 'Delete';
  deleteButton.className = 'deleteButton';
  deleteButton.innerHTML = '<svg viewBox="0 0 448 512" class="svgIcon"><path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"></path></svg>'
  deleteButton.onclick = function() {
      tableBody.removeChild(newRow);
      updateSerialNumbers();
  };

  // Add the delete button to the last cell
  cell5.appendChild(deleteButton);

  // Clear the inputs
  document.getElementById('item2').value = '';
  document.getElementById('quantity2').value = '';
  document.getElementById('price2').value = '';
})