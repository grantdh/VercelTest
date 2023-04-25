const gallery = document.querySelector(".gallery");
const images = Array.from(gallery.children);

let scrollSpeed = 0;
let lastMouseX = null;
let hoveringImage = false;
let mousePosition = { x: null, y: null };

images.forEach((image) => {
  // Add a click event listener to each image to navigate to the close-up view page.
  // Replace '#' with the actual URL for the close-up view page for each image.
  image.addEventListener("click", () => {
    window.location.href = '#';
  });

  image.addEventListener("mouseenter", (e) => {
    hoveringImage = true;
    scrollSpeed = 0;
    image.style.transform = `translateX(${image._translateX}px) scale(1.2)`;
    image.style.zIndex = "10";
  });

  image.addEventListener("mouseleave", (e) => {
    hoveringImage = false;
    image.style.transform = `translateX(${image._translateX}px) scale(1)`;
    image.style.zIndex = "1";
  });
});

document.addEventListener("mousemove", (e) => {
  const windowWidth = window.innerWidth;
  const mouseX = e.clientX;
  const centerY = window.innerHeight / 2;
  const centerX = windowWidth / 2;

  mousePosition.x = mouseX; // Update mouse position
  mousePosition.y = centerY; // Update mouse position

  if (!hoveringImage) {
    if (lastMouseX !== null) {
      scrollSpeed = (mouseX - centerX) / 50;
    }
  }

  lastMouseX = mouseX;
});

function updateGalleryPosition() {
  const mouseX = mousePosition.x;
  const mouseY = mousePosition.y;

  images.forEach((image) => {
    const rect = image.getBoundingClientRect();
    const isInsideImage = mouseX > rect.left && mouseX < rect.right && mouseY > rect.top && mouseY < rect.bottom;

    if (isInsideImage) {
      if (!hoveringImage) {
        image.dispatchEvent(new Event("mouseenter"));
      }
    } else {
      if (hoveringImage) {
        image.dispatchEvent(new Event("mouseleave"));
      }
    }
  });

  if (!hoveringImage) {
    images.forEach((image, index) => {
      const imageWidth = image.offsetWidth;
      const currentTranslateX = image._translateX || 0;
      let newTranslateX = currentTranslateX + scrollSpeed;

      if (newTranslateX > window.innerWidth + imageWidth / 2) {
        newTranslateX -= (window.innerWidth + imageWidth) * 2;
      } else if (newTranslateX < -imageWidth - imageWidth / 2) {
        newTranslateX += (window.innerWidth + imageWidth) * 2;
      }

      image._translateX = newTranslateX;
      image.style.transform = `translateX(${newTranslateX}px) scale(1)`;
    });
  }

  requestAnimationFrame(updateGalleryPosition);
}

requestAnimationFrame(updateGalleryPosition);
