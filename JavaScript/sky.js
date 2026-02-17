// =======================
// SKY SYSTEM
// =======================

const skyTexture = new Image();
skyTexture.src = "sky.jpg"; // coloque a imagem na pasta

function drawSky() {
  const halfHeight = canvas.height / 2;

  // normaliza ângulo entre 0 e 2π
  const angle = (player.angle % (2 * Math.PI) + 2 * Math.PI) % (2 * Math.PI);

  const skySpeed = 7; // ajuste a sensibilidade do céu
  const textureWidth = skyTexture.width;

  // calcula deslocamento proporcional ao ângulo
  let skyOffset = ((angle / (2 * Math.PI)) * textureWidth * skySpeed) % textureWidth;
  if (skyOffset < 0) skyOffset += textureWidth;

  // desenha múltiplas vezes para cobrir toda a largura da tela
  if (skyTexture.complete) { // só desenha se a imagem carregou
    for (let x = -skyOffset; x < canvas.width; x += textureWidth) {
      ctx.drawImage(skyTexture, x, 0, textureWidth, halfHeight);
    }
  } else {
    // fallback azul se não carregou
    ctx.fillStyle = "#88c";
    ctx.fillRect(0, 0, canvas.width, halfHeight);
  }
}
