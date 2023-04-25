const gallery = document.querySelector(".gallery");

let scrollSpeed = 0;
let lastMouseX = null;

document.addEventListener("mousemove", (e) => {
  const windowWidth = window.innerWidth;
  const mouseX = e.clientX;

  if (lastMouseX !== null) {
    scrollSpeed = mouseX - lastMouseX;
  }

  lastMouseX = mouseX;
});


// Add this function to create image elements from the imageList array
function populateGallery() {
  imageList.forEach((imageFileName) => {
    const img = document.createElement("img");
    img.src = `img/${imageFileName}`; // Adjust the folder path if necessary
    img.alt = imageFileName;
    gallery.appendChild(img);
  });
}

// Call the function to populate the gallery
populateGallery();




function updateGalleryPosition() {
  const currentTransform = gallery.style.transform;
  const currentTranslateX = parseFloat(currentTransform.match(/-?[\d.]+/)) || 0;
  const newTranslateX = currentTranslateX + scrollSpeed;
  const galleryWidth = gallery.scrollWidth / 2;

  // Check if the gallery has scrolled to the end, and if so, reset its position
  if (Math.abs(newTranslateX) > galleryWidth) {
    const sign = Math.sign(scrollSpeed);
    gallery.style.transform = `translateX(${newTranslateX - galleryWidth * sign * 2}px)`;
  } else {
    gallery.style.transform = `translateX(${newTranslateX}px)`;
  }

  // Continue updating the gallery's position
  requestAnimationFrame(updateGalleryPosition);
}

// Start updating the gallery's position
requestAnimationFrame(updateGalleryPosition);

let scrollSpeed = -2; // Set the initial scroll speed
