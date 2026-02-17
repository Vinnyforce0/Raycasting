// =======================
// FLOORCAST COM IMAGEDATA
// =======================

let floorImageData = null;
let floorBuffer = null;

function initFloorBuffer() {
  floorImageData = ctx.createImageData(canvas.width, canvas.height);
  floorBuffer = floorImageData.data;
}

function drawFloor() {

  if (!floorImageData ||
    floorImageData.width !== canvas.width ||
    floorImageData.height !== canvas.height) {
    initFloorBuffer();
  }

  const horizon = canvas.height / 2;
  const fov = Math.PI / 3;

  for (let y = horizon; y < canvas.height; y++) {

    const perspective = (y - horizon);
    if (perspective === 0) continue;

    const rowDistance = (canvas.height / (2 * perspective));

    for (let x = 0; x < canvas.width; x++) {

      const rayAngle =
        player.angle - (fov / 2) +
        (x / canvas.width) * fov;

      const floorX = player.x + Math.cos(rayAngle) * rowDistance;
      const floorY = player.y + Math.sin(rayAngle) * rowDistance;

      // índice do pixel no buffer
      const index = (y * canvas.width + x) * 4;

      const shade = Math.max(0, 100 - rowDistance * 15);

      floorBuffer[index] = shade;
      floorBuffer[index + 1] = shade;
      floorBuffer[index + 2] = shade;
      floorBuffer[index + 3] = 255;
    }
  }

  ctx.putImageData(floorImageData, 0, 0);
}
