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
