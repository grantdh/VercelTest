const gallery = document.querySelector(".gallery");
const images = Array.from(gallery.children);

let scrollSpeed = 2;
let lastMouseX = null;

document.addEventListener("mousemove", (e) => {
  const windowWidth = window.innerWidth;
  const mouseX = e.clientX;
  const centerX = windowWidth / 2;

  if (lastMouseX !== null) {
    scrollSpeed = (mouseX - centerX) / 50;
  }

  lastMouseX = mouseX;
});

function updateGalleryPosition() {
  images.forEach((image, index) => {
    const imageRect = image.getBoundingClientRect();
    const prevImageIndex = index - 1 < 0 ? images.length - 1 : index - 1;
    const prevImageRect = images[prevImageIndex].getBoundingClientRect();

    if (scrollSpeed > 0 && imageRect.left > window.innerWidth) {
      const newTranslateX = prevImageRect.left - prevImageRect.width;
      image.style.transform = `translateX(${newTranslateX}px)`;
    } else if (scrollSpeed < 0 && imageRect.right < 0) {
      const newTranslateX = prevImageRect.right;
      image.style.transform = `translateX(${newTranslateX}px)`;
    } else {
      const currentTransform = image.style.transform;
      const currentTranslateX = parseFloat(currentTransform.match(/-?[\d.]+/)) || 0;
      const newTranslateX = currentTranslateX + scrollSpeed;
      image.style.transform = `translateX(${newTranslateX}px)`;
    }
  });

  requestAnimationFrame(updateGalleryPosition);
}

requestAnimationFrame(updateGalleryPosition);
