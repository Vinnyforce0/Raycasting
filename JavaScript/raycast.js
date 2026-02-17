const fov = Math.PI / 3;
const rays = 200;
const maxDepth = 800;

function castRays() {

  for (let i = 0; i < rays; i++) {

    const rayAngle =
      player.angle - fov / 2 + (i / rays) * fov;

    let depth = 0;
    let hit = false;

    while (!hit && depth < maxDepth) {

      depth += 1;

      const rayX =
        player.x + Math.cos(rayAngle) * depth;
      const rayY =
        player.y + Math.sin(rayAngle) * depth;

      if (isWall(rayX, rayY)) hit = true;
    }

    if (hit) {

      const correctedDepth =
        depth * Math.cos(rayAngle - player.angle);

      const wallHeight =
        (tileSize * 500) / correctedDepth;

      const columnWidth =
        canvas.width / rays;

      const x = i * columnWidth;
      const y =
        canvas.height / 2 - wallHeight / 2;

      const shade =
        255 - Math.min(255, correctedDepth * 0.5);

      ctx.fillStyle =
        `rgb(${shade},${shade},${shade})`;

      ctx.fillRect(
        x,
        y,
        columnWidth + 1,
        wallHeight
      );
    }
  }
}

const tileSize = 64;

const map = [
  [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
  [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
  [1,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
  [1,0,0,0,0,0,0,1],
  [1,0,0,0,0,0,0,1],
  [1,0,0,0,0,0,0,1],
  [1,1,1,1,1,1,1,1],
];

function isWall(x, y) {

  const mapX = Math.floor(x / tileSize);
  const mapY = Math.floor(y / tileSize);

  if (
    mapX < 0 ||
    mapY < 0 ||
    mapY >= map.length ||
    mapX >= map[0].length
  ) {
    return true;
  }

  return map[mapY][mapX] === 1;
}
