// =======================
// FLOORCAST OTIMIZADO
// =======================

function drawFloor() {
  const horizon = canvas.height / 2;
  const fov = (gameSettings.fov * Math.PI) / 180; // Usa configuração
  
  // Desenha linhas horizontais em vez de pixel-by-pixel
  for (let y = horizon; y < canvas.height; y += 1) {
    const perspective = (y - horizon);
    if (perspective === 0) continue;

    const rowDistance = (canvas.height / (2 * perspective));
    
    // Calcula cor com fade de distância
    const shade = Math.max(20, Math.min(100, 100 - rowDistance * 12));
    
    ctx.strokeStyle = `rgb(${shade}, ${shade}, ${shade})`;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(canvas.width, y);
    ctx.stroke();
  }
}
