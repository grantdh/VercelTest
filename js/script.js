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

document.addEventListener("mousemove", (e) => {
  const windowWidth = window.innerWidth;
  const mouseX = e.clientX;

  // Calculate the scroll speed based on the cursor's position
  const scrollSpeed = (mouseX / windowWidth) * 2 - 1;

  // Apply the scroll speed to the gallery
  gallery.style.transform = `translateX(calc(-50% + ${scrollSpeed * 100}px))`;
});
