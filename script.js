//////////
alert(`...  Welcome to DasMemeGenerator Page  ...
            Enter details to way to my Page `);
let Vname = prompt("Enter Your Name : ").toLowerCase();
Vname = Vname[0].toUpperCase() + Vname.slice(1);
alert(`Hello ${Vname},
Lets Create & Share Memes of Fun on Your Own`);
////////// 

const generatedMeme = document.getElementById('generated-meme');

///// On Submit Runs Function /////
document.querySelector('form').addEventListener('submit', function (e) {
  e.preventDefault();
  const topText = document.getElementById('top-text').value;
  const bottomText = document.getElementById('bottom-text').value;
  const imageFile = document.getElementById('choose-file');
  const imageUrl = document.getElementById('image-url').value;

  //  INPUT VALIDATIONS
  if (topText === '' && bottomText === '') {
    alert(`Please Enter the Texts ${Vname}`);
    console.error("INVALID INPUT DATA");
    return;
  } else if (imageFile.files.length === 0 && imageUrl === '') {
    alert(`Please Add Image-File or Image-Url ${Vname}`);
    return;
  } else if (imageFile.files.length !== 0 && imageUrl === '') {
    console.log("imageFile is added");
    createImageViaFile(imageFile.files[0]);
    return;
  } else if (imageFile.files.length === 0 && imageUrl !== '') {
    console.log("imageUrl is added");
    createImageViaUrl(imageUrl);
    return;
  } else {
    console.log("else condn is printed!...");
    return;
  }
});// forms eventlistener ends

// Get the button element by its ID
const download_btn = document.getElementById('download-btn');
const canvas = document.getElementById('canvas');

// Add a click event listener to the button
download_btn.addEventListener('click', () => {
  // Call the downloadImage function with the canvas as an argument
  canvas.scrollIntoView({ behavior: 'smooth' });
  downloadImage(canvas, 'Das_memes.png')
  .then(() => {
    console.log('The image has been downloaded');
  })
  .catch(err => {
    console.log('Error downloading image: ', err);
  });
  
});


//createImageViaFile function starts
function createImageViaFile(convertingImage) {
  const imageFilePath = URL.createObjectURL(convertingImage);
  console.log(imageFilePath, "trndfbe");
  const image = new Image();
  image.src = imageFilePath;

  image.addEventListener("load", () => {
    updateMemeCanvas(canvas, image, document.getElementById('top-text').value, document.getElementById('bottom-text').value);
    const generated_text = document.getElementById("generated-text");
    generated_text.style.display = "block";
    generated_text.style.opacity = "1";
    

    // displaying Generated meme box
    generatedMeme.style.display = "block";
    // Apply a CSS transition to the scroll behavior and opacity
    generatedMeme.style.transition = "scroll-behavior 1s ease-in-out, opacity 1s ease-in-out";

    const download_btn = document.getElementById("download-btn");
    download_btn.style.display = "block";
    download_btn.style.transition = "opacity 2s ease-in-out";
    generatedMeme.style.opacity = "1";
    download_btn.style.opacity = "1";
  });
  console.log("convertingImage runned");
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
    updateMemeCanvas(canvas, img, document.getElementById('top-text').value, document.getElementById('bottom-text').value);

    const generated_text = document.getElementById("generated-text");
    generated_text.style.opacity = "1";

    // displaying Generated meme box
    generatedMeme.style.display = "block";
    // Apply a CSS transition to the scroll behavior and opacity
    generatedMeme.style.transition = "scroll-behavior 1s ease-in-out, opacity 1s ease-in-out";

    const download_btn = document.getElementById("download-btn");
    download_btn.style.display = "block";
    download_btn.style.transition = "opacity 2s ease-in-out";
    generatedMeme.style.opacity = "1";
    download_btn.style.opacity = "1";
  };

  // Set the image source
  img.src = convertingImage;
}

// Function to update the meme canvas
function updateMemeCanvas(canvas, image, topText, bottomText) {
  const ctx = canvas.getContext("2d");
  const width = image.width;
  const height = image.height;
  const fontSize = Math.floor(width / 10);
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
