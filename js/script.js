const canvas = document.getElementById('patternCanvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

class Polygon {
  constructor(x, y, sides, radius, angle, rotationSpeed) {
    this.x = x;
    this.y = y;
    this.sides = sides;
    this.radius = radius;
    this.angle = angle;
    this.rotationSpeed = rotationSpeed;
  }

draw() {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.angle);
    ctx.strokeStyle = 'rgba(0, 0, 0, 0.5)'; // Add this line to set stroke style

    ctx.beginPath();
    ctx.moveTo(this.radius * Math.cos(0), this.radius * Math.sin(0));

    for (let i = 1; i <= this.sides; i++) {
      ctx.lineTo(
        this.radius * Math.cos(i * 2 * Math.PI / this.sides),
        this.radius * Math.sin(i * 2 * Math.PI / this.sides)
      );
    }

    ctx.closePath();
    ctx.stroke();
    ctx.restore();
  }


  update() {
    this.angle += this.rotationSpeed;
  }
}

function createPolygons() {
  const polygons = [];
  const sides = [3, 4, 6];

  for (let i = 0; i < 50; i++) {
    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height;
    const radius = Math.random() * 100;
    const angle = Math.random() * Math.PI * 2;
    const rotationSpeed = (Math.random() * 0.02 - 0.01) * Math.PI;
    const sideIndex = Math.floor(Math.random() * sides.length);

    polygons.push(new Polygon(x, y, sides[sideIndex], radius, angle, rotationSpeed));
  }

  return polygons;
}

const polygons = createPolygons();

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  polygons.forEach((polygon) => {
    polygon.draw();
    polygon.update();
  });

  requestAnimationFrame(animate);
}

animate();
