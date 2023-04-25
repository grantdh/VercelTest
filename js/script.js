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

  // Update the gallery's position
  gallery.style.transform = `translateX(${newTranslateX}px)`;

  // Reduce scroll speed gradually
  scrollSpeed *= 0.95;

  // Continue updating the gallery's position
  requestAnimationFrame(updateGalleryPosition);
}

// Start updating the gallery's position
requestAnimationFrame(updateGalleryPosition);
