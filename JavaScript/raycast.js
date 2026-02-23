const fov = Math.PI / 3;
const rays = 200;
const maxDepth = 800;
const tileSize = 64;

// =======================
// CARREGAR TEXTURA
// =======================

const wallTexture = new Image();
wallTexture.src = "Images/floor.jpg";

// =======================
// RAYCAST COM TEXTURA
// =======================

function castRays(usetextures) {

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

      // =======================
      // CALCULAR POSIÇÃO NA TEXTURA
      // =======================

      const hitX = player.x + Math.cos(rayAngle) * depth;
      const hitY = player.y + Math.sin(rayAngle) * depth;

      const offsetX = hitX % tileSize;
      const offsetY = hitY % tileSize;

      let wallX;

      // detecta qual lado foi mais próximo da borda
      if (offsetX < 1 || offsetX > tileSize - 1) {
        wallX = offsetY / tileSize;
      } else {
        wallX = offsetX / tileSize;
      }


      let texX =
        Math.floor(wallX * wallTexture.width);

      // segurança contra erro
      if (texX < 0) texX = 0;
      if (texX >= wallTexture.width)
        texX = wallTexture.width - 1;

      // =======================
      // DESENHAR COLUNA TEXTURIZADA
      // =======================

      if (usetextures && wallTexture.complete) {

        ctx.drawImage(
          wallTexture,
          texX, 0, 1, wallTexture.height,
          x, y, columnWidth + 1, wallHeight
        );

      } else {

        // versão sem textura (cor simples)
        let shade = Math.min(correctedDepth / 500, 1);

        ctx.fillStyle = `rgba(${200 - shade * 100}, 
                        ${200 - shade * 100}, 
                        ${200 - shade * 100}, 1)`;

        ctx.fillRect(x, y, columnWidth + 1, wallHeight);
      }
      // escurecimento por distância
      let shade = Math.min(correctedDepth / 600, 1);

      ctx.fillStyle = `rgba(0,0,0,${shade})`;
      ctx.fillRect(x, y, columnWidth + 1, wallHeight);

    }
  }
}

const map = [
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
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
