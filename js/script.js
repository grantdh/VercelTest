const canvas = document.getElementById('patternCanvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

class Polygon {
  constructor(x, y, sides, radius, angle) {
    this.x = x;
    this.y = y;
    this.sides = sides;
    this.radius = radius;
    this.angle = angle;
  }

  draw() {
    ctx.beginPath();
    ctx.moveTo(this.x + this.radius * Math.cos(this.angle), this.y + this.radius * Math.sin(this.angle));

    for (let i = 1; i <= this.sides; i++) {
      ctx.lineTo(
        this.x + this.radius * Math.cos(this.angle + i * 2 * Math.PI / this.sides),
        this.y + this.radius * Math.sin(this.angle + i * 2 * Math.PI / this.sides)
      );
    }

    ctx.closePath();
    ctx.stroke();
  }
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  const polygons = [];
  const sides = [3, 4, 6];
  const angle = Math.random() * Math.PI * 2;

  for (let i = 0; i < 50; i++) {
    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height;
    const radius = Math.random() * 100;
    const sideIndex = Math.floor(Math.random() * sides.length);

    polygons.push(new Polygon(x, y, sides[sideIndex], radius, angle));
  }

  polygons.forEach((polygon) => {
    polygon.draw();
  });

  requestAnimationFrame(animate);
}

animate();
