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


function mandelbrotASCII() {
  const width = 80;
  const height = 22;
  const maxIterations = 1000;
  const mandelbrot = document.getElementById("mandelbrot");
  let output = "";

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const zx = (x / width) * 3.5 - 2.5;
      const zy = (y / height) * 2 - 1;

      let c = { x: zx, y: zy };
      let z = { x: 0, y: 0 };
      let iterations = 0;

      while (iterations < maxIterations) {
        const xt = z.x * z.x - z.y * z.y + c.x;
        z.y = 2 * z.x * z.y + c.y;
        z.x = xt;
        iterations++;

        if (z.x * z.x + z.y * z.y > 4) {
          break;
        }
      }

      output += iterations === maxIterations ? "#" : " ";
    }
    output += "\n";
  }

  mandelbrot.textContent = output;
}

mandelbrotASCII();
