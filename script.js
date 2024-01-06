
const generatedMeme = document.getElementById('generated-meme');

///// On Submit Runs Function /////
document.querySelector('form').addEventListener('submit', function (e) {
  e.preventDefault();
  const topText = document.getElementById('top-text').value;
  const bottomText = document.getElementById('bottom-text').value;
  const imageFile = document.getElementById('choose-file');
  const imageUrl = document.getElementById('image-url').value;
  const generatedMeme = document.getElementById('generated-meme');

  //  INPUT VALIDATIONS
  if (topText === '' && bottomText === '') {
    alert(`Please Enter the Texts`);
    console.error("INVALID INPUT DATA");
    return;
  } else if (imageFile.files.length === 0 && imageUrl === '') {
    alert(`Please Add Image-File or Image-Url`);
  } else if (imageFile.files.length !== 0 && imageUrl === '') {
    console.error("imageFile is added");
    createImageViaFile(imageFile.files[0]);
  } else if (imageFile.files.length === 0 && imageUrl !== '') {
    console.error("imageUrl is added");
    createImageViaUrl(imageUrl);
  } else if(imageFile.files.length !== 0 && imageUrl !== ''){
    alert(`Add only One Image input`);
  } else {
    console.error("No Operation Instructed.")
    return;
  }

  generatedMeme.scrollIntoView({ behavior: 'smooth' })
  //console.log("scrolling is done")
});// forms eventlistener ends

// Get the button element by its ID
const generated_text = document.getElementById("generated-text");
const download_btn = document.getElementById('download-btn');
const share_meme_btn = document.getElementById('sharememe-btn');
const canvas = document.getElementById('canvas');

// Add a click event listener to the button
download_btn.addEventListener('click', () => {
  // Call the downloadImage function with the canvas as an argument
  
  downloadImage(canvas, 'Das_memes.png')
  .then(() => {
    console.error('The image has been downloaded');
  })
  .catch(err => {
    console.error('Error downloading image: ', err);
  });  
});

// Resetting page with button
const reset_btn = document.getElementById("reset-btn");
reset_btn.addEventListener("click",()=> {
  canvas.style.display = "none";
  download_btn.style.display = "none";
  generated_text.style.display = "none";
  share_meme_btn.style.display = "none";
  //alert("Are You Ok With Page Resetting ?")
});

// adding click event for sharing created meme
share_meme_btn.addEventListener('click',shareMemeImage);

//createImageViaFile function starts
function createImageViaFile(convertingImage) {
  const imageFilePath = URL.createObjectURL(convertingImage);
  const image = new Image();
  image.src = imageFilePath;

  image.addEventListener("load", () => {
    canvas.style.display ="block";
    updateMemeCanvas(canvas, image, document.getElementById('top-text').value, document.getElementById('bottom-text').value);
    const generated_text = document.getElementById("generated-text");
    generated_text.style.display = "block";
    generated_text.style.opacity = "1";
    

    // displaying Generated meme box
    generatedMeme.style.display = "block";
    // Apply a CSS transition to the scroll behavior and opacity
    generatedMeme.style.transition = "scroll-behavior 1s ease-in-out, opacity 1s ease-in-out";

    const download_btn = document.getElementById("download-btn");
    const share_meme_btn = document.getElementById('sharememe-btn');

    download_btn.style.display = share_meme_btn.style.display = "block";
    download_btn.style.transition = share_meme_btn.style.transition = "opacity 2s ease-in-out";
    generatedMeme.style.opacity = generatedMeme.style.opacity = "1";
    download_btn.style.opacity = share_meme_btn.style.opacity = "1";
  });
  //console.log("convertingImage runned");
}

//createImageViaUrl function starts
function createImageViaUrl(convertingImage) {
  // Create an image object
  const img = new Image();
  img.crossOrigin = "anonymous";

  // Listen for the load event
  img.onload = function () {
    // Set the image source after it's loaded
    img.setAttribute("src", convertingImage);

    // ===== CANVAS =====
    canvas.style.display ="block";
    updateMemeCanvas(canvas, img, document.getElementById('top-text').value, document.getElementById('bottom-text').value);

    const generated_text = document.getElementById("generated-text");
    generated_text.style.opacity = "1";

    // displaying Generated meme box
    generatedMeme.style.display = "block";
    // Apply a CSS transition to the scroll behavior and opacity
    generatedMeme.style.transition = "scroll-behavior 1s ease-in-out, opacity 1s ease-in-out";

    const download_btn = document.getElementById("download-btn");
    const share_meme_btn = document.getElementById('sharememe-btn');

    download_btn.style.display = share_meme_btn.style.display = "block";
    download_btn.style.transition = share_meme_btn.style.transition = "opacity 2s ease-in-out";
    generatedMeme.style.opacity = generatedMeme.style.opacity = "1";
    download_btn.style.opacity = share_meme_btn.style.opacity = "1";
  };

  // Set the image source
  img.src = convertingImage;
}

// Function to update the meme canvas
function updateMemeCanvas(canvas, image, topText, bottomText) {
  const ctx = canvas.getContext("2d");
  const width = image.width;
  const height = image.height;
  const fontSize = Math.floor(width / 15);
  const yOffset = height / 25;

  // Update canvas background
  canvas.width = width;
  canvas.height = height;
  ctx.drawImage(image, 0, 0);

  // Prepare text
  ctx.strokeStyle = "black";
  ctx.lineWidth = Math.floor(fontSize / 4);
  ctx.fillStyle = "white";
  ctx.textAlign = "center";
  ctx.lineJoin = "round";
  ctx.font = `${fontSize}px sans-serif`;

  // Add top text
  ctx.textBaseline = "top";
  ctx.strokeText(topText, width / 2, yOffset);
  ctx.fillText(topText, width / 2, yOffset);

  // Add bottom text
  ctx.textBaseline = "bottom";
  ctx.strokeText(bottomText, width / 2, height - yOffset);
  ctx.fillText(bottomText, width / 2, height - yOffset);
  
}

// =====================================
// DOWNLOADING FILE ===========================
// Function to download an image or canvas content
async function downloadImage(data, nameOfDownload = "Das_MemeGeneration.jpg") {
  let href;

  if (typeof data === 'string') {
    // If the provided data is a string (URL), fetch the image
    const response = await fetch(data);
    const blobImage = await response.blob();
    href = URL.createObjectURL(blobImage);
  } else if (data instanceof HTMLCanvasElement) {
    // If the provided data is a canvas, convert it to a data URL
    href = data.toDataURL();
  } else {
    console.error('Invalid data type for downloadImage function.');
    return;
  }

  // Create an anchor element
  const downloadLink = document.createElement('a');
  downloadLink.href = href;
  downloadLink.download = nameOfDownload;

  // Append the anchor element to the document
  document.body.appendChild(downloadLink);

  // Trigger a click event on the anchor element
  downloadLink.click();

  // Remove the anchor element from the document
  document.body.removeChild(downloadLink);

  // Revoke the object URL to free up resources
  window.URL.revokeObjectURL(href);
}// download fun ends

////// SHARE option function
function shareWebpage() {
  if (navigator.share) {
    navigator.share({
      title: 'Das-MemeGenerator',
      text: 'Check out this awesome MEME Generator webpage!',
      url: window.location.href
    })
    .then(() => console.log('Shared successfully'))
    .catch((error) => console.error('Error sharing:', error));
  }
  else {
    alert('Web Share API is not supported on this browser.');
  }
}

///////////  SHARING MEME ////////////
function shareMemeImage() {
  // Assuming you have a canvas element named 'canvas'
  const canvas = document.getElementById('canvas');

  if (navigator.share && canvas) {
    // Convert the canvas content to a data URL
    const imageDataUrl = canvas.toDataURL('image/png');

    // Use the Web Share API to share the image
    navigator.share({
      files: [new File([dataURLtoBlob(imageDataUrl)], 'Das-MemeGen.png', { type: 'image/png' })],
      title: 'Check out this awesome meme I created!',
      text: 'Via Das-MemeGenerator',
    })
    .then(() => console.log('Shared successfully'))
    .catch((error) => console.error('Error sharing:', error));
  } else {
    alert('Web Share API is not supported on this browser or canvas element not found.');
  }
}

// Helper function to convert data URL to Blob
function dataURLtoBlob(dataURL) {
  const arr = dataURL.split(',');
  const mime = arr[0].match(/:(.*?);/)[1];
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new Blob([u8arr], { type: mime });
}