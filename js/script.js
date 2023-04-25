const gallery = document.querySelector(".gallery");
const images = document.querySelectorAll(".gallery img");

let scrollDirection = 1;
let scrollSpeed = 1;

function scrollGallery() {
  gallery.style.transform = `translateX(${scrollDirection * scrollSpeed}px)`;
  scrollSpeed += 1;

  // Reset the scroll speed when the mouse is not over the gallery
  setTimeout(() => {
    if (!gallery.matches(":hover")) {
      scrollSpeed = 1;
    }
  }, 50);
}

images.forEach((img) => {
  img.addEventListener("mouseover", () => {
    scrollDirection = 0;
  });

  img.addEventListener("mouseout", (event) => {
    const mouseX = event.clientX;
    const imgRect = img.getBoundingClientRect();

    // Determine the scroll direction based on the mouse position
    if (mouseX < imgRect.left) {
      scrollDirection = -1;
    } else {
      scrollDirection = 1;
    }
  });
});

setInterval(scrollGallery, 50);

let scrollSpeed = 1;

document.addEventListener("mousemove", (e) => {
  const windowWidth = window.innerWidth;
  const mouseX = e.clientX;

  // Calculate the scroll speed based on the cursor's position
  scrollSpeed = (mouseX / windowWidth) * 2 - 1;
});

function updateGalleryPosition() {
  const currentTransform = gallery.style.transform;
  const currentTranslateX = parseFloat(currentTransform.match(/-?[\d.]+/)) || 0;
  const newTranslateX = currentTranslateX + scrollSpeed;

  // Update the gallery's position
  gallery.style.transform = `translateX(${newTranslateX}px)`;

  // Continue updating the gallery's position
  requestAnimationFrame(updateGalleryPosition);
}

// Start updating the gallery's position
updateGalleryPosition();

