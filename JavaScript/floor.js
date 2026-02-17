function drawFloor() {
  const halfHeight = canvas.height / 2;
  const tileSize = 20; // tamanho de cada quadrado

  // calcula deslocamento contínuo
  const cosA = Math.cos(player.angle);
  const sinA = Math.sin(player.angle);

  // deslocamento do chão baseado no movimento e na rotação
  const offsetX = -((player.x * cosA + player.y * sinA) * 1) % tileSize;
  const offsetY = -((player.y * cosA - player.x * sinA) * 1) % tileSize;

  // corrige offset negativo
  const finalOffsetX = offsetX < 0 ? offsetX + tileSize : offsetX;
  const finalOffsetY = offsetY < 0 ? offsetY + tileSize : offsetY;

  // desenha os tiles
  for (let x = finalOffsetX - tileSize; x < canvas.width; x += tileSize) {
    for (let y = halfHeight + finalOffsetY - tileSize; y < canvas.height; y += tileSize) {
      const col = Math.floor((x - finalOffsetX) / tileSize);
      const row = Math.floor((y - halfHeight - finalOffsetY) / tileSize);
      const isLight = (col + row) % 2 === 0;

      ctx.fillStyle = isLight ? "#666" : "#444";
      ctx.fillRect(x, y, tileSize, tileSize);
    }
  }
}
